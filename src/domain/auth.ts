import { Entity, PrimaryGeneratedColumn, Column, AfterLoad, BeforeInsert, BeforeUpdate } from 'typeorm'
import * as crypto from 'crypto'
import { config as envConfig } from 'dotenv'
envConfig()

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

  decrypt(source: string): string {
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(String(process.env.DB_AES_KEY)),
      String(process.env.DB_AES_IV)
    )
    return decipher.update(source, 'base64', 'utf8') + decipher.final('utf8')
  }

  @AfterLoad()
  async DecryptedUser() {
    this.name = this.decrypt(String(this.name))
    this.uniqueNo = this.decrypt(String(this.uniqueNo))
  }

  encrypt(source: string): string {
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(String(process.env.DB_AES_KEY)),
      String(process.env.DB_AES_IV)
    )
    return cipher.update(source, 'utf8', 'base64') + cipher.final('base64')
  }

  @BeforeInsert()
  @BeforeUpdate()
  async EncryptedUser() {
    this.name = this.encrypt(String(this.name))
    this.uniqueNo = this.encrypt(String(this.uniqueNo))
  }
}

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
