import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({
  name: 'token'
})
export class Token {
  @PrimaryGeneratedColumn({
    type: 'int'
  })
  id?: number

  @Column({
    name: 'user_id',
    type: 'int',
    nullable: false
  })
  userId?: number

  @Column({
    name: 'serial',
    type: 'char',
    nullable: false
  })
  serial?: string

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false
  })
  createdAt?: Date

  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: false
  })
  deletedAt?: Date
}
