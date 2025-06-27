using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodOrderingApi.Migrations
{
    /// <inheritdoc />
    public partial class AddRestaurantAndCategoryNavigation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Restaurants",
                newName: "RestaurantName");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Restaurants",
                newName: "RestaurantId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "FoodItems",
                newName: "FoodItemId");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Categories",
                newName: "CategoryName");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Categories",
                newName: "CategoryId");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Restaurants",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Restaurants",
                keyColumn: "RestaurantId",
                keyValue: 1,
                column: "Address",
                value: null);

            migrationBuilder.UpdateData(
                table: "Restaurants",
                keyColumn: "RestaurantId",
                keyValue: 2,
                column: "Address",
                value: null);

            migrationBuilder.UpdateData(
                table: "Restaurants",
                keyColumn: "RestaurantId",
                keyValue: 3,
                column: "Address",
                value: null);

            migrationBuilder.UpdateData(
                table: "Restaurants",
                keyColumn: "RestaurantId",
                keyValue: 4,
                column: "Address",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Restaurants");

            migrationBuilder.RenameColumn(
                name: "RestaurantName",
                table: "Restaurants",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "RestaurantId",
                table: "Restaurants",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "FoodItemId",
                table: "FoodItems",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "CategoryName",
                table: "Categories",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "Categories",
                newName: "Id");
        }
    }
}
