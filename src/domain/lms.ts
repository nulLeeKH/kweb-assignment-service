import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({
  name: 'lecture'
})
export class Lecture {
  @PrimaryGeneratedColumn({
    type: 'int'
  })
  id?: number

  @Column({
    name: 'prof_id',
    type: 'int',
    nullable: false
  })
  profId?: number

  @Column({
    name: 'title',
    type: 'varchar',
    nullable: false
  })
  title?: string
}

@Entity({
  name: 'board'
})
export class Board {
  @PrimaryGeneratedColumn({
    type: 'int'
  })
  id?: number

  @Column({
    name: 'lecture_id',
    type: 'int',
    nullable: false
  })
  lectureId?: number

  @Column({
    name: 'title',
    type: 'varchar',
    nullable: false
  })
  title?: string

  @Column({
    name: 'content',
    type: 'longtext',
    nullable: false
  })
  content?: string
}

@Entity({
  name: 'enrolment'
})
export class Enrolment {
  @PrimaryGeneratedColumn({
    type: 'int'
  })
  id?: number

  @Column({
    name: 'lecture_id',
    type: 'int',
    nullable: false
  })
  lectureId?: number

  @Column({
    name: 'stdt_id',
    type: 'int',
    nullable: false
  })
  stdtId?: number
}
