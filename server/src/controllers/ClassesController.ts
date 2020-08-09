import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const time = filters.time as string;
    const week_day = filters.week_day as string;

    const hasAllFilters = Boolean(subject && time && week_day)

    if (!hasAllFilters) {
      return response.status(400).json({
        error: 'Missing filters'
      })
    }

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [Number(timeInMinutes)])
          .whereRaw('`class_schedule`.`to` > ??', [Number(timeInMinutes)])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return response.status(200).json(
      classes
    );
  },

  async create(request: Request, response: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;

    const trx = await db.transaction();

    try {
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = insertedUsersIds[0];

      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedClassesIds[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        const { week_day, from, to } = scheduleItem;
        return {
          week_day,
          from: convertHourToMinutes(from),
          to: convertHourToMinutes(to),
          class_id,
        };
      });

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return response.status(201).json({
        message: 'Success',
      })
    } catch (error) {
      trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while creating new class',
      })
    }
  }
}