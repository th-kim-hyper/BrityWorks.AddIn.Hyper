using RPAGO.AddIn;
using RPAGO.Common.Data;
using RPAGO.Common.Event;
using System;
using System.Collections.Generic;
using System.Linq;
using HyperInfo.Lib.Net461.Dto;
using System.Drawing;
using BrityWorks.AddIn.Hyper.Properties;
using RPAGO.Common.Library;
using HyperInfo.Lib.Net461.Mail;

namespace BrityWorks.AddIn.Hyper.Activities
{
    public class ReceiveMail : IActivityItem
    {
        public static readonly PropKey OutputPropKey = new PropKey("OUTPUT", "Result");

        public static readonly PropKey ProtocolPropKey = new PropKey("CONNECTION", "Protocol");
        public static readonly PropKey HostNamePropKey = new PropKey("CONNECTION", "HostName");
        public static readonly PropKey PortPropKey = new PropKey("CONNECTION", "Port");
        public static readonly PropKey IdPorpKey = new PropKey("CONNECTION", "ID");
        public static readonly PropKey PwdPropKey = new PropKey("CONNECTION", "Password");
        public static readonly PropKey UseSSLPropKey = new PropKey("CONNECTION", "UseSSL");

        public static readonly PropKey DateTimeRangePropKey = new PropKey("MAIL", "DateTimeRange");
        public static readonly PropKey BeginTimePropKey = new PropKey("MAIL", "BeginTime");
        public static readonly PropKey EndTimePropKey = new PropKey("MAIL", "EndTime");
        public static readonly PropKey SenderPropKey = new PropKey("MAIL", "Sender");
        public static readonly PropKey SubjectPropKey = new PropKey("MAIL", "Subject");
        public static readonly PropKey WithAttachmentsPropKey = new PropKey("MAIL", "WithAttachments");
        public static readonly PropKey SaveDirPropKey = new PropKey("MAIL", "SaveDir");
        public static readonly PropKey RecentFirstPropKey = new PropKey("MAIL", "RecentFirst");

        public string DisplayName => "Hyper Receive Mail";

        public Bitmap Icon => Resources.hi_works_excute;

        public LibraryHeadlessType Mode => LibraryHeadlessType.Both;

        public PropKey DisplayTextProperty => OutputPropKey;

        public PropKey OutputProperty => OutputPropKey;

        protected PropertySet PropertyList;

        public string PresetRange { get; set; } = "All;Today;This Week;This Month;This Year";

        protected virtual void OnProtocolChanged(object oldValue, object newValue)
        {
            var value = newValue.ToStr();
            var propItem = PropertyList[PortPropKey];
            propItem.Value = (value == "IMAP") ? 993 : 995;
            ReloadPropertyEvent.Publish();
        }

        protected virtual void OnWithAttachmentsChanged(object oldValue, object newValue)
        {
            var value = newValue?.ToBoolValue();
            var propItem = PropertyList[SaveDirPropKey];
            propItem.SetVisible(value == true ? true : false);
            ReloadPropertyEvent.Publish();
        }

        protected virtual void OnPresetRangeChanged(object oldValue, object newValue)
        {
            var value = newValue?.ToStr();
            var beginTimeItem = PropertyList[BeginTimePropKey];
            var endTimeItem = PropertyList[EndTimePropKey];
            var presetRanges = PresetRange.Split(';');

            beginTimeItem.ValueChangedHandler = null;
            endTimeItem.ValueChangedHandler = null;

            if (value.EqualsEx(presetRanges[0], true))
            {
                beginTimeItem.Value = "";
                endTimeItem.Value = "";
            }
            else if (value.EqualsEx(presetRanges[1], true))
            {
                beginTimeItem.Value = "'" + DateTime.Now.ToString("yyyy-MM-dd 00:00:00") + "'";
                endTimeItem.Value = "";
            }
            else if (value.EqualsEx(presetRanges[2], true))
            {
                var dateTime = DateTime.Now;
                var week = dateTime.DayOfWeek;

                dateTime = (week == DayOfWeek.Sunday) ? dateTime = dateTime.AddDays(-6) : dateTime.AddDays(1 - (int)week);
                beginTimeItem.Value = "'" + dateTime.ToString("yyyy-MM-dd 00:00:00") + "'";
                endTimeItem.Value = "";
            }
            else if (value.EqualsEx(presetRanges[3], true))
            {
                beginTimeItem.Value = "'" + DateTime.Now.ToString("yyyy-MM-01 00:00:00") + "'";
                endTimeItem.Value = "";
            }
            else if (value.EqualsEx(presetRanges[4], true))
            {
                beginTimeItem.Value = "'" + DateTime.Now.ToString("yyyy-01-01 00:00:00") + "'";
                endTimeItem.Value = "";
            }

            beginTimeItem.ResetValueChangedHandler().SetValueChangedHandler(OnDateTimeChanged);
            endTimeItem.ResetValueChangedHandler().SetValueChangedHandler(OnDateTimeChanged);
            ReloadPropertyEvent.Publish();
        }

        protected virtual void OnDateTimeChanged(object oldValue, object newValue)
        {
            var value = newValue?.ToStr();
            var rangePropItem = PropertyList[DateTimeRangePropKey];
            var presetRanges = PresetRange.Split(';');

            rangePropItem.ValueChangedHandler = null;
            rangePropItem.Value = presetRanges[0];

            rangePropItem.ResetValueChangedHandler().SetValueChangedHandler(OnPresetRangeChanged);
            ReloadPropertyEvent.Publish();
        }

        public virtual List<Property> OnCreateProperties()
        {
            var properties = new List<Property>()
            {
                new Property(this, OutputPropKey, "RESULT"),

                new Property(this, ProtocolPropKey, "'IMAP'").SetDropDownList("IMAP;POP3"),
                new Property(this, HostNamePropKey, "'imap.mail.com'").SetRequired(),
                new Property(this, PortPropKey, 995).SetRequired(),
                new Property(this, IdPorpKey, "'from@mail.com'").SetRequired(),
                new Property(this, PwdPropKey, "", true).SetControlType(PropertyControls.PropertyItemPasswordView).SetRequired(),
                new Property(this, UseSSLPropKey, true),

                new Property(this, DateTimeRangePropKey, PresetRange.Split(';')[1]).SetDropDownList(PresetRange),
                new Property(this, BeginTimePropKey, "'" + DateTime.Now.ToString("yyyy-MM-dd 00:00:00") + "'"),
                new Property(this, EndTimePropKey, ""),
                new Property(this, SenderPropKey, ""),
                new Property(this, SubjectPropKey, ""),
                new Property(this, WithAttachmentsPropKey, false),
                new Property(this, SaveDirPropKey, "").SetVisible(false),
                new Property(this, RecentFirstPropKey, true),
            };

            ReloadPropertyEvent.Publish();
            return properties;
        }

        public virtual void OnLoad(PropertySet properties)
        {
            properties[DateTimeRangePropKey].ResetValueChangedHandler().SetValueChangedHandler(OnPresetRangeChanged);
            properties[BeginTimePropKey].ResetValueChangedHandler().SetValueChangedHandler(OnDateTimeChanged);
            properties[EndTimePropKey].ResetValueChangedHandler().SetValueChangedHandler(OnDateTimeChanged);

            properties[ProtocolPropKey].ResetValueChangedHandler().SetValueChangedHandler(OnProtocolChanged);
            properties[WithAttachmentsPropKey].ResetValueChangedHandler().SetValueChangedHandler(OnWithAttachmentsChanged);
            properties.Values.ToList().ForEach((item) => item.SetOrder(properties.Values.ToList().IndexOf(item)));
            PropertyList = properties;
        }

        public virtual object OnRun(IDictionary<string, object> properties)
        {
            var protocol = properties[ProtocolPropKey].ToStr();
            var host = properties[HostNamePropKey].ToStr();
            var port = properties[PortPropKey].ToIntValue();
            var id = properties[IdPorpKey].ToStr();
            var password = properties[PwdPropKey].ToStr();
            var useSsl = properties[UseSSLPropKey].ToBoolValue();

            var beginTime = properties[BeginTimePropKey].ToStr();
            var endTime = properties[EndTimePropKey].ToStr();
            var sender = properties[SenderPropKey].ToStr();
            var subject = properties[SubjectPropKey].ToStr();
            var withAttachements = (properties[WithAttachmentsPropKey]?.ToBoolValue() == true);
            var saveDir = properties[SaveDirPropKey].ToStr();
            var recentFirst = properties[RecentFirstPropKey].ToBoolValue();
            
            var messages = null as IEnumerable<MailMessageDTO>;

            if (protocol.EqualsEx("IMAP", true))
            {
                messages = HyperMail.ReceiveIMAP(host, port, id, password, useSsl, beginTime, endTime, sender, subject, withAttachements, saveDir);
            }
            else if (protocol.EqualsEx("POP3", true))
            {
                messages = HyperMail.ReceivePOP3(host, port, id, password, useSsl, beginTime, endTime, sender, subject, withAttachements, saveDir);
            }

            if(messages?.Count() > 0)
            {
                messages = messages.OrderBy(m => m.ReceiveDate.Ticks);

                if(recentFirst == true)
                {
                    messages = messages.Reverse();
                }
            }

            return messages?.ToArray();
        }
    }
}
