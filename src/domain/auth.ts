import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({
  name: 'user'
})
export class User {
  @PrimaryGeneratedColumn({
    type: 'int'
  })
  id?: number

  @Column({
    name: 'username',
    type: 'varchar',
    nullable: false
  })
  username?: string

  @Column({
    name: 'password',
    type: 'char',
    nullable: false
  })
  password?: string

  @Column({
    name: 'salt',
    type: 'varchar',
    nullable: false
  })
  salt?: string

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false
  })
  name?: string

  @Column({
    name: 'unique_no',
    type: 'char',
    nullable: true
  })
  uniqueNo?: string

  @Column({
    name: 'type',
    type: 'char',
    nullable: false
  })
  type?: string

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false
  })
  createdAt?: Date

  @Column({
    name: 'changed_at',
    type: 'timestamp',
    nullable: false
  })
  changedAt?: Date

  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: false
  })
  deletedAt?: Date
}
