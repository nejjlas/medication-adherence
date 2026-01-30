using MediatR;

namespace MedicationAdherence.Application.Modules.Doses
{
    public class ConfirmDoseCommandHandler : IRequestHandler<ConfirmDoseCommand, ConfirmDoseResponse>
    {
        public Task<ConfirmDoseResponse> Handle(ConfirmDoseCommand request, CancellationToken cancellationToken)
        {
            // Rule-based "AI" (privremeno fiksno)
            var risk = "normal";
            if (request.DelayMinutes >= 10) risk = "warning";
            if (request.DelayMinutes >= 20) risk = "critical";

            var response = new ConfirmDoseResponse(
                Message: "Dose confirmed",
                MedicationName: request.MedicationName,
                ScheduledAt: request.ScheduledAt,
                ConfirmedAt: request.ConfirmedAt,
                DelayMinutes: request.DelayMinutes,
                RiskLevel: risk
            );

            return Task.FromResult(response);
        }
    }
}
