# ☕ beanRating – Brewing the Best: A Data-Driven Coffee Guide

Welcome to **beanRating**, a visual and interactive dashboard that helps coffee lovers, researchers, and vendors explore the quality of coffee beans around the world using real data and rich visualizations.

---

## Project Website  
[Visit the Coffee Rating Website](https://your-project-site.com)

## Project Overview

Coffee is more than just a beverage — it's a global culture. With this project, our goal is to understand what makes great coffee and how different characteristics, origins, and production trends affect its quality.

Using a comprehensive dataset and powerful visualizations, **beanRating** allows users to:
- Analyze coffee bean characteristics and how they vary by country.
- Explore relationships between production trends and quality.
- Compare attributes like aroma, flavor, acidity, and more across regions.
- Filter and sort coffee bean data easily through an interactive table.

---

## Team Members

- **Riya Deshpande** – [riyarajeshde@umass.edu](mailto:riyarajeshde@umass.edu)
- **Phuong Nguyen** – [phulnguyen@umass.edu](mailto:phulnguyen@umass.edu)
- **Kevin Dao** – [bdao@umass.edu](mailto:bdao@umass.edu)

---

## 📊 Features

- **Ranking Table:** Sortable, filterable table of coffee bean characteristics.
- **Line Charts:** 
  - Average coffee production by country over years.
  - Average total score of beans by country over years.
- **Radar Chart:**  Explore multiple attributes of a selected coffee bean.
- **Stacked Bar Chart:** Explore the contribution of each characteristic to the total score for each country and year.

---

## Data Processing

We used a Kaggle dataset with ~1000 rows detailing:
- Origin (country, region, altitude)
- Type (species, variety, processing method)
- Production data (bags, weight, year)
- Attribute scores (aroma, flavor, acidity, aftertaste, Body, Balance, Uniformity, Sweetness,	Moisture)

### Cleaning & Transformation Steps
- Handled missing values and standardized formatting.
- Derived a `QualityCategory` (`HIGH`, `MODERATE`, `LOW`) based on total score.
- Grouped and averaged scores by relevant fields to reduce redundancy.
- Split into CSVs for chart-specific use.

---

## Folder Structure:

- Cleaned base dataset and the other derived data files can be found at - ./my-app/public/datasets
- Source code found in ./my-app/src

## Steps on running the project:
After cloning the repo to your device, open the terminal in the clone folder, and then please do the following before run the app:
```bash
cd my-app
npm install
```
Then to run the project:
```bash
npm start
```

Note: For newer node versions, please run the following to make the code work:

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

## Project Screencast Link: 

[Watch the 2-Minute Screencast](https://www.youtube.com/watch?v=uo2VmsI0Cgw)
