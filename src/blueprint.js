/** @import * as $ from "../lib/js/jquery-3.7.1.min.js" */

const PREFIX = "[Blueprint] ";

function determineInch() {
    const $inch = $("<span>").css({
        position: "absolute",
        left: "-1000px",
        top: "-1000px",
        width: "1in",
        overflow: "hidden",
        visibility: "hidden"
    });
    $("body").append($inch);
    const inch = $inch.width();
    $inch.remove();
    return inch;
}

function fetchBlueprint(path) {
    return new Promise((resolve, reject) => {
        console.debug(`${PREFIX}Fetching blueprint template from:`, window.__bpjsBlueprintTemplate);
        if (window.__bpjsBlueprintTemplate) {
            resolve($(window.__bpjsBlueprintTemplate));
        } else {
            $.get(path).done((data) => {
                resolve($(data));
            })
                .catch((xhr, _status, _error) => {
                    reject(`${PREFIX}Error fetching blueprint template: ${xhr.status}: ${xhr.statusText}`);
                });
        }
    });
}

function drawMarks(sizing, $bpmarks) {
    const {numTenthsX, numTenthsY} = sizing;
    console.debug(`${PREFIX}Drawing marks with sizing:`, sizing);

    // Draw top vertical marks
    const $vertical = $("<div class=\"blueprint-marks-vertical\">");
    for (let i = 0; i < numTenthsX; i++) {
        const $mark = $("<span class=\"blueprint-mark vertical\">").css({
            "left": `${(i * 0.1 - (0.01 / 2))}in`,
        });
        $vertical.append($mark);
    }
    $bpmarks.append($vertical);

    // Draw left horizontal marks
    const $horizontal = $("<div class=\"blueprint-marks-horizontal\">");
    for (let i = 0; i < numTenthsY; i++) {
        const $mark = $("<span class=\"blueprint-mark horizontal\">").css({
            "top": `${(i * 0.1 - (0.01 / 2))}in`,
        });
        $horizontal.append($mark);
    }
    $bpmarks.append($horizontal);

    // Draw bottom vertical marks
    const $bottomVertical = $("<div class=\"blueprint-marks-vertical bottom\">");
    for (let i = 0; i < numTenthsX / 10; i++) {
        const $mark = $("<span class=\"blueprint-mark vertical bottom\">").css({
            "left": `${(i - (0.01 / 2))}in`
        });
        $bottomVertical.append($mark);
    }
    $bpmarks.append($bottomVertical);

    // Draw right horizontal marks
    const $rightHorizontal = $("<div class=\"blueprint-marks-horizontal right\">");
    for (let i = 0; i < numTenthsY / 10; i++) {
        const $mark = $("<span class=\"blueprint-mark horizontal right\">").css({
            "top": `${(i - (0.01 / 2))}in`
        });
        $rightHorizontal.append($mark);
    }
    $bpmarks.append($rightHorizontal);
}

function drawGrid(sizing, $bpgrid) {
    const {numTenthsX, numTenthsY} = sizing;
    console.debug(`${PREFIX}Drawing grid with sizing:`, sizing);

    // Draw vertical lines
    const $vertical = $("<div class=\"blueprint-grid-vertical\">");
    for (let i = 1; i < numTenthsX; i++) {
        const $line = $("<span class=\"blueprint-grid-line vertical\">").css({
            "left": `${(i * 0.1 - (0.01 / 2))}in`
        });
        $vertical.append($line);
    }
    $bpgrid.append($vertical);

    // Draw horizontal lines
    const $horizontal = $("<div class=\"blueprint-grid-horizontal\">");
    for (let i = 1; i < numTenthsY; i++) {
        const $line = $("<span class=\"blueprint-grid-line horizontal\">").css({
            "top": `${(i * 0.1 - (0.01 / 2))}in`
        });
        $horizontal.append($line);
    }
    $bpgrid.append($horizontal);
}

function drawBlueprint(inch, $blueprint) {
    const $body = $blueprint.find(".blueprint-body");
    if ($body.length === 0) {
        console.error(`${PREFIX}No blueprint body found in the template.`);
        return;
    }
    const bw = $body.width();
    const bh = $body.height();
    console.debug(`${PREFIX}Blueprint body dimensions: ${bw}px x ${bh}px`);
    const numInchesX = Math.ceil(bw / inch);
    const numInchesY = Math.ceil(bh / inch);
    const numTenthsX = Math.ceil(bw / (inch / 10));
    const numTenthsY = Math.ceil(bh / (inch / 10));
    const sizing = {
        inch: inch,
        numInchesX: numInchesX,
        numInchesY: numInchesY,
        numTenthsX: numTenthsX,
        numTenthsY: numTenthsY
    };

    const $marks = $blueprint.find(".blueprint-marks");
    $marks.empty();
    drawMarks(sizing, $marks);

    const $grid = $blueprint.find(".blueprint-grid");
    $grid.empty();
    drawGrid(sizing, $grid);
}

(async function() {
    const inch = determineInch();
    console.debug(`${PREFIX}Determined inch size: ${inch}px`);

    let $template;
    try {
        $template = await fetchBlueprint(new URL("./blueprint.html", document.currentScript.src));
    } catch (error) {
        console.error(error);
        return;
    }
    console.debug(`${PREFIX}Fetched blueprint template:`, $template);

    const blueprints = [];
    const $blueprints = $(".t-blueprint");
    if ($blueprints.length === 0) {
        console.warn(`${PREFIX}No blueprints found on the page.`);
        return;
    }
    for (let i = 0; i < $blueprints.length; i++) {
        let $blueprint = $($blueprints[i]);
        // Preserve the original content
        const originalContent = $blueprint.html();
        const $clone = $($template.clone().prop('content'));
        const $inserted = $clone.children().first();
        // Insert the original content into the template's .blueprint-body
        const $body = $inserted.find('.blueprint-body');
        if ($body.length > 0) $body.html(originalContent);
        $blueprint.replaceWith($inserted);
        $blueprint = $inserted;
        $clone.remove();
        console.debug(`${PREFIX}Processing blueprint ${i + 1}/${$blueprints.length}:`, $blueprint);
        drawBlueprint(inch, $blueprint);
        $blueprint.on("resize", () => {
            console.debug(`${PREFIX}Resizing blueprint:`, $blueprint);
            drawBlueprint(inch, $blueprint);
        });
        blueprints.push($blueprint);
    }
    $(window).on("resize", () => {
        console.debug(`${PREFIX}Window resized, redrawing all blueprints.`);
        for (let i = 0; i < blueprints.length; i++) {
            const $bp = blueprints[i];
            drawBlueprint(inch, $bp);
        }
    });
}());