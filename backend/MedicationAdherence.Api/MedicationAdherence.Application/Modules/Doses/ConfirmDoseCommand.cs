using MediatR;

namespace MedicationAdherence.Application.Modules.Doses
{
    public record ConfirmDoseCommand(
            string MedicationName,
            string ScheduledAt,
            string ConfirmedAt,
            int DelayMinutes
        ) : IRequest<ConfirmDoseResponse>;
}
