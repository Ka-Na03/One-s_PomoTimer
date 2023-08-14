class TimerSetting < ApplicationRecord
  belongs_to :user, optional: true

  validates :study_time, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1 }
  validates :short_break_time, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1 }
  validates :long_break_time, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1 }
  validates :set_count_before_long_break, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1 }

end
