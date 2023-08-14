class CreateWorkRecords < ActiveRecord::Migration[7.0]
  def change
    create_table :work_records do |t|
      t.references :user, foregin_key: true
      t.datetime :work_date_time
      t.integer :total_work_time
      t.integer :break_time
      t.integer :pomodoro_count

      t.timestamps
    end
  end
end
