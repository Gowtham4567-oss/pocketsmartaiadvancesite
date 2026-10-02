from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/generate-recommendations', methods=['POST'])
def generate_recommendations():
    data = request.json
    total_budget = float(data.get('budget', 5000))
    
    # Calculate budget allocations
    lighting_alloc = total_budget * 0.30
    fan_alloc = total_budget * 0.40
    furniture_alloc = total_budget * 0.30
    
    response_data = {
        "total_budget": total_budget,
        "remaining_budget": total_budget * 0.10,
        "categories": [
            {
                "title": "Lighting",
                "allocation": lighting_alloc,
                "items": [
                    {
                        "name": "LED Bulb (Warm White)",
                        "description": "Energy-efficient LED bulbs for general lighting",
                        "price": 100.00,
                        "quantity": 5,
                        "links": ["Amazon", "Flipkart", "Ikea", "Myntra", "Ajio"]
                    }
                ]
            },
            {
                "title": "Ceiling Fans",
                "allocation": fan_alloc,
                "items": [
                    {
                        "name": "Havells Ceiling Fan",
                        "description": "Basic functional ceiling fan",
                        "price": 500.00,
                        "quantity": 4,
                        "links": ["Amazon", "Flipkart", "Ikea", "Myntra", "Ajio"]
                    }
                ]
            },
            {
                "title": "Furniture",
                "allocation": furniture_alloc,
                "items": [
                    {
                        "name": "Plastic Chair",
                        "description": "Stackable plastic chairs for kitchen or living room",
                        "price": 250.00,
                        "quantity": 2,
                        "links": ["Amazon", "Flipkart", "Ikea", "Myntra", "Ajio"]
                    },
                    {
                        "name": "Small Wooden Table",
                        "description": "Simple wooden table for dining or side table",
                        "price": 500.00,
                        "quantity": 1,
                        "links": ["Amazon", "Flipkart", "Ikea", "Myntra", "Ajio"]
                    }
                ]
            }
        ],
        "suggestions": [
            "Consider purchasing used furniture for further cost savings.",
            "Look for sales and discounts on online marketplaces.",
            "Prioritize essential items and postpone non-essential purchases."
        ]
    }
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)
