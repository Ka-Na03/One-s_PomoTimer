class CreateAlarmSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :alarm_settings do |t|
      t.references :user, foregin_key: true
      t.integer :volume, default: 30

      t.timestamps
    end
  end
end
