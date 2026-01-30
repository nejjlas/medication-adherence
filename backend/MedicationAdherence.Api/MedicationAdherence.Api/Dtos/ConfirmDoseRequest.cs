namespace MedicationAdherence.Api.Dtos
{
    public class ConfirmDoseRequest
    {
        public string MedicationName { get; set; } = string.Empty;
        public string ScheduledAt {  get; set; } = string.Empty;
        public string ConfirmedAt {  get; set; } = string.Empty;
        public int DelayMinutes { get; set; }
    }
}
