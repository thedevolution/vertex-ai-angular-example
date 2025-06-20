namespace Restaurants.API.Domain
{
	public class Order
	{
		public string NameOnOrder { get; set; } = string.Empty;
		public DateOnly DateOrdered { get; set; } = DateOnly.MinValue;
		public List<MenuItem> OrderedItems { get; set; } = Enumerable.Empty<MenuItem>().ToList();
	}
}
