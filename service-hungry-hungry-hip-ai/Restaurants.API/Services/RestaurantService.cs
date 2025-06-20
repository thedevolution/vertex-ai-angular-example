using Restaurants.API.Domain;
using System.Text.Json;

namespace Restaurants.API.Services
{
	public class RestaurantService : IRestaurantService
	{
		public async Task<IEnumerable<Restaurant>> GetAllRestaurants()
		{
			var jsonFilePath = Path.Combine(AppContext.BaseDirectory, "Services", "json", "restaurants.json");
			var jsonString = File.ReadAllText(jsonFilePath);
			var toReturn = JsonSerializer.Deserialize<List<Restaurant>>(jsonString) ?? Enumerable.Empty<Restaurant>();
			return toReturn;
		}

		public async Task<IEnumerable<Order>> GetMyRecentOrders()
		{
			var jsonFilePath = Path.Combine(AppContext.BaseDirectory, "Services", "json", "myorders.json");
			var jsonString = File.ReadAllText(jsonFilePath);
			var toReturn = JsonSerializer.Deserialize<List<Order>>(jsonString) ?? Enumerable.Empty<Order>();
			return toReturn;
		}
	}
}
