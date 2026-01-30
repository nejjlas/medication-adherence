namespace MedicationAdherence.Application.Modules.Doses
{
    public record ConfirmDoseResponse(
        string Message,
        string MedicationName,
        string ScheduledAt,
        string ConfirmedAt,
        int DelayMinutes,
        string RiskLevel
    );
}
