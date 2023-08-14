class CreateTimerSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :timer_settings do |t|
      t.references :user, foregin_key: true
      t.integer :work_time, default: 25
      t.integer :short_break_time, default: 5
      t.integer :long_break_time, default: 15
      t.integer :set_count_before_long_break, default: 4

      t.timestamps
    end
  end
end
