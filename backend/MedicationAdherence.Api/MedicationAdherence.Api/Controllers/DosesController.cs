using MediatR;
using MedicationAdherence.Api.Dtos;
using MedicationAdherence.Application.Modules.Doses;
using Microsoft.AspNetCore.Mvc;


namespace MedicationAdherence.Api.Controllers
{
    [ApiController]
    [Route("api/doses")]
    public class DosesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DosesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // 1) React (ili ESP) šalje potvrdu terapije
        [HttpPost("confirm")]
        public async Task<ActionResult<ConfirmDoseResponse>> Confirm([FromBody] ConfirmDoseRequest request)
        {
            var command = new ConfirmDoseCommand(
                request.MedicationName,
                request.ScheduledAt,
                request.ConfirmedAt,
                request.DelayMinutes
            );

            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
