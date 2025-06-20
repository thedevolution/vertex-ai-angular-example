namespace Restaurants.API.Domain
{
	public class Restaurant
	{
		public int Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Address { get; set; } = string.Empty;
		public List<MenuCategory> MenuCategories { get; set; } = new List<MenuCategory>();
	}

	public class MenuCategory
	{
		public int Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public List<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
	}

	public class MenuItem
	{
		public int Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public decimal Price { get; set; }
	}
}
