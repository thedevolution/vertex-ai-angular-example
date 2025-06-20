using Restaurants.API.Domain;

namespace Restaurants.API.Services
{
	public interface IRestaurantService
	{
		Task<IEnumerable<Restaurant>> GetAllRestaurants();

		Task<IEnumerable<Order>> GetMyRecentOrders();
	}
}
