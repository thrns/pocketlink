'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Send,
  Calendar,
  Clock,
  X,
  AlertCircle,
  Users,
  Info,
  Zap,
  TrendingUp,
} from 'lucide-react';

const SendOptionsModal = ({
  isOpen,
  onClose,
  onSendImmediate,
  onSchedule,
  isSubmitting = false,
  emailSubject = 'this email',
  recipientCount = 0,
  isWorkspaceAccount = false,
  campaignEmails = [], // Add this prop to get existing emails in campaign
}) => {
  const [selectedOption, setSelectedOption] = useState('immediate');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [validationError, setValidationError] = useState('');
  const [sendingSchedule, setSendingSchedule] = useState(null);
  const [useSpacing, setUseSpacing] = useState(true); // New state for spacing toggle

  // Email sending limits and parameters - updated to use recipientCount as maxCampaign
  const emailParams = useMemo(
    () =>
      isWorkspaceAccount
        ? { L: 2000, S1: 45, r: 1.6, maxCampaign: recipientCount }
        : { L: 500, S1: 15, r: 1.5, maxCampaign: recipientCount },
    [isWorkspaceAccount, recipientCount]
  );

  // Calculate the recommended scheduling date based on existing campaign emails
  const recommendedDate = useMemo(() => {
    if (!campaignEmails || campaignEmails.length === 0) {
      return null; // No recommendation if no existing emails
    }

    // Get all expected final dates from existing emails
    const expectedDates = campaignEmails
      .map((email) => email.expected_final_date)
      .filter((date) => date)
      .map((date) => new Date(date));

    if (expectedDates.length === 0) {
      return null; // No recommendation if no expected dates
    }

    // Find the latest expected final date
    const latestExpectedDate = new Date(Math.max(...expectedDates));

    // Add one day to the latest expected date
    const nextDay = new Date(latestExpectedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    return nextDay;
  }, [campaignEmails]);

  // Check if there's a scheduling recommendation (recommended date is in the future)
  const hasSchedulingRecommendation = useMemo(() => {
    return recommendedDate && recommendedDate > new Date();
  }, [recommendedDate]);

  // Calculate email sending schedule using the formula
  const calculateSendingSchedule = (
    totalRecipients,
    startDate,
    useSpacingOption
  ) => {
    if (totalRecipients === 0) return null;

    // If not using spacing, send all at once
    if (!useSpacingOption) {
      return {
        schedule: [
          {
            day: 1,
            date: new Date(startDate),
            emails: totalRecipients,
          },
        ],
        totalDays: 1,
        endDate: new Date(startDate),
      };
    }

    // Otherwise use the spacing formula
    const { L, S1, r } = emailParams;
    const schedule = [];
    let remaining = totalRecipients;
    let day = 1;
    const currentDate = new Date(startDate);

    while (remaining > 0 && day <= 7) {
      // Formula: emails_d = min(L, ⌈S₁ · r^(d-1)⌉, remaining recipients)
      const formulaResult = Math.ceil(S1 * Math.pow(r, day - 1));
      const emailsToday = Math.min(L, formulaResult, remaining);

      schedule.push({
        day,
        date: new Date(currentDate),
        emails: emailsToday,
      });

      remaining -= emailsToday;
      currentDate.setDate(currentDate.getDate() + 1);
      day++;
    }

    return {
      schedule,
      totalDays: schedule.length,
      endDate: schedule[schedule.length - 1]?.date,
    };
  };

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setSelectedOption('immediate'); // Always default to immediate (no restriction)
      setScheduledDate('');
      setScheduledTime('');
      setValidationError('');
      setUseSpacing(true); // Default to using spacing

      // Set default date to tomorrow for scheduling option
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 1);
      setScheduledDate(defaultDate.toISOString().split('T')[0]);

      // Set default time to 9 AM
      setScheduledTime('09:00');
    }
  }, [isOpen]);

  useEffect(() => {
    // Calculate sending schedule when recipients or dates change
    if (recipientCount > 0) {
      let startDate;
      if (selectedOption === 'immediate') {
        startDate = new Date();
      } else if (scheduledDate && scheduledTime) {
        startDate = new Date(`${scheduledDate}T${scheduledTime}`);
      } else {
        setSendingSchedule(null);
        return;
      }

      const schedule = calculateSendingSchedule(
        recipientCount,
        startDate,
        useSpacing
      );
      setSendingSchedule(schedule);
    } else {
      setSendingSchedule(null);
    }
  }, [
    recipientCount,
    selectedOption,
    scheduledDate,
    scheduledTime,
    emailParams,
    useSpacing,
  ]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setValidationError('');

    if (selectedOption === 'immediate') {
      const sendTime = new Date();
      await onSendImmediate(sendTime.toISOString(), sendingSchedule);
    } else {
      // Validate scheduled date and time
      if (!scheduledDate || !scheduledTime) {
        setValidationError('Please select both date and time for scheduling.');
        return;
      }

      const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
      const now = new Date();

      if (scheduledDateTime <= now) {
        setValidationError('Scheduled time must be in the future.');
        return;
      }

      // No restriction on scheduling date - user can schedule whenever they want
      await onSchedule(scheduledDateTime.toISOString(), sendingSchedule);
    }
  };

  const getMinDate = () => {
    // Allow scheduling from today onwards (no restriction)
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMinTime = () => {
    const today = new Date();
    const selectedDateObj = new Date(scheduledDate);

    // If selected date is today, set minimum time to current time + 1 hour
    if (selectedDateObj.toDateString() === today.toDateString()) {
      const minTime = new Date(today.getTime() + 60 * 60 * 1000);
      return minTime.toTimeString().slice(0, 5);
    }

    return '00:00';
  };

  const formatScheduleDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4">
      <div className="mx-auto my-8 flex max-h-[calc(100vh-4rem)] w-full max-w-2xl flex-col rounded-lg bg-white">
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Send Email Campaign
          </h3>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg bg-gray-100 p-1 text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {validationError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
                <div className="flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-red-600" />
                  <p className="text-sm text-red-800">{validationError}</p>
                </div>
              </div>
            )}

            {/* Campaign Info */}
            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Campaign: "{emailSubject}"
                  </p>
                  <div className="mt-1 flex items-center text-sm text-blue-700">
                    <Users className="mr-1 h-4 w-4" />
                    {recipientCount} recipients
                    <span className="mx-2">•</span>
                    <span className="font-medium">
                      {isWorkspaceAccount ? 'Workspace' : 'Gmail'} Account
                    </span>
                    {useSpacing && (
                      <>
                        <span className="mx-2">•</span>
                        <span>Daily limit: {emailParams.L}/day</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sending Strategy Toggle */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Sending Strategy</h4>
              </div>

              <div className="space-y-3">
                {/* Space out emails option */}
                <label className="relative flex cursor-pointer items-start rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50">
                  <input
                    type="radio"
                    name="sendingStrategy"
                    checked={useSpacing}
                    onChange={() => setUseSpacing(true)}
                    disabled={isSubmitting}
                    className="mr-3 mt-1 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4 text-blue-600" />
                      <span className="font-medium text-gray-900">
                        Space out emails (Recommended)
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Gradually increase sending volume over multiple days for
                      better deliverability
                    </p>
                  </div>
                </label>

                {/* Send all at once option */}
                <label className="relative flex cursor-pointer items-start rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50">
                  <input
                    type="radio"
                    name="sendingStrategy"
                    checked={!useSpacing}
                    onChange={() => setUseSpacing(false)}
                    disabled={isSubmitting}
                    className="mr-3 mt-1 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Zap className="mr-2 h-4 w-4 text-orange-600" />
                      <span className="font-medium text-gray-900">
                        Send all at once
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Send all {recipientCount} emails immediately without
                      spacing
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Campaign Scheduling Recommendation */}
            {hasSchedulingRecommendation && (
              <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start">
                  <Info className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium">Scheduling Recommendation</p>
                    <p className="mt-1">
                      To help prevent potential account restrictions, we
                      recommend scheduling this email on or after{' '}
                      {recommendedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}{' '}
                      to avoid overlapping with existing campaign emails.
                    </p>
                    <p className="mt-2 text-xs text-amber-700">
                      <strong>Note:</strong> You can still schedule this email
                      whenever you prefer. This is just a recommendation to help
                      maintain good sending practices.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {/* Send Immediately Option */}
              <label className="relative flex cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:bg-gray-100">
                <input
                  type="radio"
                  name="sendOption"
                  value="immediate"
                  checked={selectedOption === 'immediate'}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  disabled={isSubmitting}
                  className="mr-3 mt-1 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <Send className="mr-2 h-4 w-4 text-green-600" />
                    <span className="font-medium text-gray-900">
                      Send Immediately
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Email will be sent right away
                  </p>
                </div>
              </label>

              {/* Schedule Option */}
              <label className="relative flex cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:bg-gray-100">
                <input
                  type="radio"
                  name="sendOption"
                  value="scheduled"
                  checked={selectedOption === 'scheduled'}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  disabled={isSubmitting}
                  className="mr-3 mt-1 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                    <span className="font-medium text-gray-900">
                      Schedule for Later
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Choose a specific date and time
                  </p>
                </div>
              </label>
            </div>

            {/* Schedule Date/Time Inputs */}
            {selectedOption === 'scheduled' && (
              <div className="mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="scheduledDate"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Date
                    </label>
                    <input
                      id="scheduledDate"
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => {
                        setScheduledDate(e.target.value);
                        if (validationError) setValidationError('');
                      }}
                      min={getMinDate()}
                      disabled={isSubmitting}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="scheduledTime"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Time
                    </label>
                    <input
                      id="scheduledTime"
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => {
                        setScheduledTime(e.target.value);
                        if (validationError) setValidationError('');
                      }}
                      min={
                        scheduledDate === getMinDate() ? getMinTime() : '00:00'
                      }
                      disabled={isSubmitting}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {scheduledDate && scheduledTime && (
                  <div className="mt-3 rounded-lg border border-blue-200 bg-white p-3">
                    <div className="flex items-center text-blue-700">
                      <Clock className="mr-2 h-4 w-4" />
                      <span className="text-sm font-medium">
                        {new Date(
                          `${scheduledDate}T${scheduledTime}`
                        ).toLocaleString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    {/* Show additional recommendation if user schedules before recommended date */}
                    {hasSchedulingRecommendation &&
                      scheduledDate &&
                      new Date(scheduledDate) <
                        new Date(
                          recommendedDate.toISOString().split('T')[0]
                        ) && (
                        <div className="mt-2 text-xs text-amber-700">
                          💡 Consider scheduling after{' '}
                          {recommendedDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}{' '}
                          for optimal delivery practices
                        </div>
                      )}
                  </div>
                )}
              </div>
            )}

            {/* Sending Schedule Preview */}
            {sendingSchedule && recipientCount > 0 && (
              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="mb-3 flex items-center">
                  <Info className="mr-2 h-4 w-4 text-green-600" />
                  <h4 className="font-medium text-green-900">
                    Sending Schedule
                  </h4>
                </div>

                <div className="text-sm text-green-800">
                  {!useSpacing ? (
                    <p>
                      <strong>All {recipientCount} emails</strong> will be sent
                      at the same time on{' '}
                      {sendingSchedule.endDate?.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  ) : (
                    <>
                      <p className="mb-2">
                        <strong>Duration:</strong> {sendingSchedule.totalDays}{' '}
                        day
                        {sendingSchedule.totalDays > 1 ? 's' : ''}
                        <span className="mx-2">•</span>
                        <strong>Completion:</strong>{' '}
                        {sendingSchedule.endDate?.toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>

                      <div className="mt-3">
                        <p className="mb-1 font-medium">Daily breakdown:</p>
                        <div className="grid grid-cols-7 gap-1 text-xs">
                          {sendingSchedule.schedule.map((day, index) => (
                            <div
                              key={index}
                              className="rounded bg-white px-2 py-1 text-center"
                            >
                              <div className="font-medium">
                                {formatScheduleDate(day.date)}
                              </div>
                              <div className="text-green-700">
                                {day.emails} emails
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Warning for sending all at once with large recipient count */}
            {!useSpacing && recipientCount > 500 && (
              <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-4">
                <div className="flex items-start">
                  <AlertCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-orange-600" />
                  <div className="text-sm text-orange-800">
                    <p className="font-medium">Large batch sending</p>
                    <p className="mt-1">
                      Sending {recipientCount} emails at once may impact
                      deliverability. Consider using the "Space out emails"
                      option for better results.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    {selectedOption === 'immediate'
                      ? 'Scheduling...'
                      : 'Scheduling...'}
                  </>
                ) : (
                  <>
                    {selectedOption === 'immediate' ? (
                      <Send size={16} className="mr-2" />
                    ) : (
                      <Calendar size={16} className="mr-2" />
                    )}
                    {selectedOption === 'immediate'
                      ? useSpacing
                        ? `Start Campaign (${sendingSchedule?.totalDays || 1} day${(sendingSchedule?.totalDays || 1) > 1 ? 's' : ''})`
                        : `Send All Now (${recipientCount} emails)`
                      : 'Schedule Campaign'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendOptionsModal;
