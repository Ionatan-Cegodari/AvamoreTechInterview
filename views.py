import datetime
from flask import Blueprint, render_template, request, jsonify
from mainCalculations import ChooseCalc

views = Blueprint(__name__, "views")

@views.route("/", methods=["GET", "POST"]) #this runs the calculation html page inside the templates folder
def calculation():
    return render_template("calculations.html")

@views.route('/calculate', methods=['POST']) #uses the incoming data from web to input into the ChooseCalc Function in the mainCalculations python script
def calculate():
    data = request.get_json()

    facility_a = data['facility_a']
    contractualMonthlyRate = data['contractualMonthlyRate']
    beginningOfDefaultPeriod = datetime.date.fromisoformat(data['beginningOfDefaultPeriod'])
    endOfDefaultPeriod = datetime.date.fromisoformat(data['endOfDefaultPeriod'])

    # Call the ChooseCalc function
    result = ChooseCalc(facility_a, contractualMonthlyRate, beginningOfDefaultPeriod, endOfDefaultPeriod)

    # You need to format the result into a dictionary to send it back as JSON.
    return jsonify(result)