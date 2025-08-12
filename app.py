from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route("/") # Route for the main page
def index():
    return render_template("index.html")

@app.route("/fetchconjugation/<language>/<verb>/<time_form>/<person>")
def fetch_conjugation(language, verb, time_form, person):
    url = f"http://verbe.cc/verbecc/conjugate/{language}/{verb}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        match time_form: # in my script i combine the time and form, but verbe.cc returns in the format ...[form][time]...
            case "imperatif-présent":
                form = "imperatif"
            case _:
                form = "indicatif"
        return data["value"]["moods"][form][time_form][int(person)]
    else:
        return {"error": "Failed to fetch conjugation"}, 500

if __name__ == "__main__":
    app.run(host='0.0.0.0')