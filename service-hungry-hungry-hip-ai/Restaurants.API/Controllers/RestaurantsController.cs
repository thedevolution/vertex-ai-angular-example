using Microsoft.AspNetCore.Mvc;
using Restaurants.API.Services;

namespace Restaurants.API.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class RestaurantsController : ControllerBase
	{
		private readonly ILogger<RestaurantsController> _logger;
		private readonly IRestaurantService _restaurantService;

		public RestaurantsController(ILogger<RestaurantsController> logger, IRestaurantService restaurantService)
		{
			_logger = logger;
			_restaurantService = restaurantService;
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{
			var results = await _restaurantService.GetAllRestaurants();
			return Ok(results);
		}

		[HttpGet("GetMyRecentOrders")]
		public async Task<IActionResult> GetMyRecentOrders()
		{
			var results = await _restaurantService.GetMyRecentOrders();
			return Ok(results);
		}
	}
}
