import { Record } from 'src/records/entity/records.entity';
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RecordDetail extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne((type) => Record, (record) => record.recordDetails, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  record: Record;
}
