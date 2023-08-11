import streamlit as st

def calculate_and_display_score(people_in_household,electric_input, gas_input, oil_input, car_input, flights_4_less_input, flights_4_more_input, recycle_newspaper_selection, recycle_alum_tin_selection):
    # Function to calculate and display the carbon footprint score

    def is_checked(option, selected_option):
        return option == selected_option

    # Check selection made for recycling newspaper before calculating and displaying score
    if (not is_checked(recycle_newspaper_selection, "Yes") and not is_checked(recycle_newspaper_selection, "No")) or \
            (not is_checked(recycle_alum_tin_selection, "Yes") and not is_checked(recycle_alum_tin_selection, "No")):
        st.error("Please select whether you recycle newspapers and aluminum/tin.")
    else:
        # Convert radio button selections to boolean values
        recycle_newspaper_selection_yes = is_checked(recycle_newspaper_selection, "Yes")
        recycle_alum_tin_selection_yes = is_checked(recycle_alum_tin_selection, "Yes")

        # Set variables for calculating each component score
        newspaper_score = 0 if recycle_newspaper_selection_yes else 184
        alum_tin_score = 0 if recycle_alum_tin_selection_yes else 166

        electric_score = 0 if electric_input == 0 or electric_input == "undefined" else electric_input * 105
        gas_score = 0 if gas_input == 0 or gas_input == "undefined" else gas_input * 105
        oil_score = 0 if oil_input == 0 or oil_input == "undefined" else oil_input * 113
        car_score = 0 if car_input == 0 or car_input == "undefined" else car_input * 0.79
        flights_4_less_score = 0 if flights_4_less_input == 0 or flights_4_less_input == "undefined" else flights_4_less_input * 1100
        flights_4_more_score = 0 if flights_4_more_input == 0 or flights_4_more_input == "undefined" else flights_4_more_input * 4400

        # Calculate scores for each category
        energy_score = electric_score + gas_score + oil_score
        travel_score = car_score + flights_4_less_score + flights_4_more_score
        waste_score = newspaper_score + alum_tin_score

        # Calculate total score and round to the nearest whole integer
        total_score = round(energy_score + travel_score + waste_score)
        formatted_score = "{:,}".format(total_score/people_in_household)

        # Display results
        st.markdown(f"## Your Carbon Footprint Score: {formatted_score}")


# Main function for the Streamlit app
def main():
    # Hide results template and error alerts on initial page load
    st.markdown("# Carbon Footprint Calculator")
    st.markdown("### Enter the following data to calculate your carbon footprint:")

    # Get input values using Streamlit widgets
    people_in_household = st.number.input("Number of people in household", value = 0)
    electric_input = st.number_input("Electricity consumption (kWh)", value=0.0)
    gas_input = st.number_input("Gas consumption (therms)", value=0.0)
    oil_input = st.number_input("Oil consumption (gallons)", value=0.0)
    car_input = st.number_input("Car travel (miles)", value=0.0)
    flights_4_less_input = st.number_input("Flights taken 4 hours or less", value=0.0)
    flights_4_more_input = st.number_input("Flights taken 4 hours or more", value=0.0)

    recycle_newspaper_selection = st.radio("Do you recycle newspapers?", ("Yes", "No"))
    recycle_alum_tin_selection = st.radio("Do you recycle aluminum and tin?", ("Yes", "No"))

    # Add click event listener for the Calculate button
    if st.button("Calculate"):
        # Convert radio button selections to boolean values
        recycle_newspaper_selection_yes = recycle_newspaper_selection == "Yes"
        recycle_newspaper_selection_no = recycle_newspaper_selection == "No"
        recycle_alum_tin_selection_yes = recycle_alum_tin_selection == "Yes"
        recycle_alum_tin_selection_no = recycle_alum_tin_selection == "No"

        # Check selection made for recycling newspaper before calculating and displaying score
        if (not recycle_newspaper_selection_yes and not recycle_newspaper_selection_no) or \
                (not recycle_alum_tin_selection_yes and not recycle_alum_tin_selection_no):
            if not recycle_newspaper_selection_yes and not recycle_newspaper_selection_no:
                st.error("Please select whether you recycle newspapers.")
            if not recycle_alum_tin_selection_yes and not recycle_alum_tin_selection_no:
                st.error("Please select whether you recycle aluminum and tin.")
        else:
            # Calculate and display the carbon footprint score
            calculate_and_display_score(people_in_household,electric_input, gas_input, oil_input, car_input, flights_4_less_input, flights_4_more_input, recycle_newspaper_selection, recycle_alum_tin_selection)

# Entry point of the Streamlit app
if __name__ == "__main__":
    main()
