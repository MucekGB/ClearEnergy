# ClearEnergy

ClearEnergy is a student project for households and students. Its aim is to help people use less energy and understand electricity costs. This energy education supports UN Sustainable Development Goal 7: Affordable and Clean Energy.

## Run the website

No installation or build step is needed.

1. Open `index.html` in a web browser, or open the folder in VS Code.
2. To use Live Server, right-click `index.html` and select **Open with Live Server**.

JavaScript must be enabled for the calculator and mobile menu. No framework, backend, account or database is used.

## Files

- `index.html` — page content, navigation and labelled calculator controls.
- `css/style.css` — colours, spacing, cards and responsive layouts.
- `js/script.js` — hero slider, menu, input validation and calculator calculations.
- `assets/` — local SVG logo and hero images; no external image requests.
- `tests/calculator.test.js` — optional development tests, not loaded by the website.
- `docs/requirements-check.md` — comparison with the supplied course documents.

## Main features

- Five-slide horizontal hero controlled by the menu, arrows, dots or keyboard.
- Responsive navigation with a mobile menu.
- Six practical energy-saving tips.
- Simple explanations of solar, wind and hydropower.
- Electricity cost estimates that update when the user changes a value.
- Linked sliders and number fields, plus a short explanation of the formula and units.
- Appliance presets and a custom power option.
- Current-use and reduced-use cost comparison.
- Input validation, keyboard support and visible focus styles.
- About section with the team’s planned tasks and links to information sources.

## Team tasks

These are the planned responsibilities shown on the website:

- **Mubashir Mahboob:** website colours, page layout and navigation menu.
- **Naqash Mehrban:** logo and wireframes.
- **Mateusz Karol Mucek:** HTML pages, CSS styling and responsive layouts.
- **Haroon Riaz:** JavaScript features, electricity cost calculator and usage comparison.
- **Mohsin Mahmood:** testing, fixes and GitHub publication.

## Calculator formulas

- Daily energy = `(power in watts / 1000) × hours per day`
- Daily cost = `daily energy × (price in pence / 100)`
- Monthly energy = `daily energy × days used per month`
- Monthly cost = `monthly energy × (price in pence / 100)`
- Yearly cost = `monthly cost × 12`

All results are estimates. Standing charges are not included.

Watts (W) measure power. Kilowatt-hours (kWh) measure energy use. The price in p/kWh means pence for each kWh. A standing charge is the supplier's fixed daily charge, separate from the cost of using the device.

The rate of 25 p/kWh and appliance powers are examples, not current tariffs or measured appliance consumption. The model assumes constant power during the entered hours and the same usage for 12 months. Inputs are kept within their ranges and rounded to the slider steps; an empty field keeps its last accepted value until editing is finished.

## Simple explanation for a presentation

Follow the same order as the page. These are speaking notes, not claims about who completed the work.

1. **Home:** “ClearEnergy helps households and students use less energy and understand electricity costs.”
2. **Energy Tips:** “We show six simple actions, such as switching off lights and choosing LED bulbs.”
3. **Renewable Energy:** “We explain solar, wind and hydropower. Each has an advantage and a limitation.”
4. **Calculator:** “The user enters power, time and electricity price. The calculator estimates the cost of one device, not the full bill.”
5. **About:** “This is a student project supporting SDG 7 through energy education. The page shows our planned tasks and information sources.”

For a short demonstration, click **Reset calculator**. The default TV example uses 100 W for 4 hours a day, 30 days a month, at 25 p/kWh:

- 100 W ÷ 1,000 = 0.1 kW.
- 0.1 kW × 4 hours × 30 days = 12 kWh per month.
- 12 kWh × £0.25 = **£3 per month**.
- The same monthly use for 12 months gives **£36 per year**.
- At 2 hours a day, the estimate is **£1.50 per month**, a **£1.50 difference**.

To explain the code: “HTML holds the content. CSS controls the layout and colours. JavaScript updates the calculator and opens the mobile menu.” The page does not fetch live prices, connect to a meter or store the values entered in the calculator after the page is closed.

## Check the calculator

If Node.js is available, run:

```sh
node --check js/script.js
node --test tests/calculator.test.js
```

The six tests execute the actual website script with a small DOM stand-in. They check calculation units, input limits and steps, empty values, reduced-use comparison, reset and presets. They are not a substitute for real-browser testing.

Manual checks before submission:

1. Open the page directly and through Live Server. Check links, images and the browser console.
2. Enter 500 W, 4 hours, 30 days and 25 p/kWh: expect 60 kWh and £15 per month, £180 per year.
3. Compare with 2 hours: expect £7.50 per month and a £7.50 difference.
4. Try zero hours/days, empty and out-of-range values, decimal typing and reset after zero hours.
5. Check keyboard navigation, visible focus, mobile-menu closing and reduced-motion settings.
6. Check narrow screens and 1920, 2560, 3440 and 3840 px desktop widths; there should be no overlap or horizontal scrolling.

## Sources and project evidence

The About section links to the UN, Energy Saving Trust and US Department of Energy. These sources support the educational content; they do not provide live electricity prices.

The five local `bg-*.png` photographic backgrounds were generated with OpenAI ImageGen for this redesign, and the logo is a local SVG. The team should record any AI assistance according to the course rules and describe its own contributions accurately. The presence of these assets does not demonstrate a Photoshop workflow.

The website is only one project output. The logbook, planning evidence, wireframes, browser-test record, GitHub submission, article, presentation and viva are separate tasks. Team responsibilities shown on the page are the plan, not proof that each person completed those tasks. See the requirements check for document differences and submission dates. No GitHub publication was performed as part of this review.
