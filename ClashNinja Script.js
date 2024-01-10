const rows = document.querySelectorAll('#entityTable_gvMainEntities tbody tr');

rows.forEach((row) => {
    const {
        formattedTotalCost,
        formattedTotalTime,
        upgradeCount,
        costClass,
        imageSrc,
    } = calculateIterationTotals(row);
	
    const cell = row.querySelector('.overview-upgrades > .grid-x > .cell');
    if (cell && upgradeCount > 1) {
        const totalsDiv = document.createElement('div');
        totalsDiv.classList.add('upgrade-levels-summary', 'text-center');

        totalsDiv.innerHTML = `
			<span class="upgrade-levels-count">${upgradeCount} Levels</span> - 
            <span class="total-cost ${costClass}"><img src="${imageSrc}" class="show-for-large"> ${formattedTotalCost}</span> - 
            <span class="total-time">${formattedTotalTime}</span>`;

        cell.appendChild(totalsDiv);
    }

	
    const titleCell = row.querySelector('.overview-title');

    if (titleCell) {
        const structureIterations = [row];
        let nextRow = row.nextElementSibling;

        while (nextRow && !nextRow.querySelector('.overview-title')) {
            structureIterations.push(nextRow);
            nextRow = nextRow.nextElementSibling;
        }

        const totalUpgradeCount = structureIterations.reduce((total, iteration) => {
            const upgradeCosts = iteration.querySelectorAll('.resource-cost-1 strong, .resource-cost-2 strong, .resource-cost-3 strong');
            return total + upgradeCosts.length;
        }, 0);

        if (totalUpgradeCount > 1) {
		    const {
		        formattedTotalCost,
		        formattedTotalTime,
		        upgradeCount,
		        costClass,
		        imageSrc,
		    } = calculateIterationTotals(null, structureIterations);
			
            const summaryDiv = document.createElement('div');
            summaryDiv.classList.add('upgrade-levels-summary', 'text-center');
            summaryDiv.style.fontSize = '12px';
            summaryDiv.style.fontWeight = 'normal';

            summaryDiv.innerHTML = `
                <span class="upgrade-levels-count">${upgradeCount} Upgrades</span><br>
                <span class="total-cost ${costClass}"><img src="${imageSrc}" class="show-for-large"> ${formattedTotalCost}</span><br>
                <span class="total-time">${formattedTotalTime}</span>
            `;

            titleCell.appendChild(document.createElement('br'));
            titleCell.appendChild(summaryDiv);
        }
    }
});

addStyles();

function addStyles() {
    const styleElement = document.createElement('style');
    const cssRules = `
		.upgrade-levels-summary {
			margin-top: 10px;
			background-color: #ffffff1c;
			border-radius: 4px;
			padding: 4px 0;
		}
    `;
    styleElement.appendChild(document.createTextNode(cssRules));
    document.head.appendChild(styleElement);
}

function formatTime(totalHours) {
    let totalMonths = Math.floor(totalHours / (24 * 30));
    totalHours %= 24 * 30;
    let totalDays = Math.floor(totalHours / 24);
    totalHours %= 24;

    return `${totalMonths > 0 ? totalMonths + 'mo ' : ''}${totalDays > 0 ? totalDays + 'd ' : ''}${totalHours > 0 ? totalHours + 'h' : ''}`;
}

function formatNumber(number) {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    } else {
        return number.toString();
    }
}

function calculateIterationTotals(iteration, structureIterations = null) {
    let iterations = Array.isArray(structureIterations) ? structureIterations : (iteration ? [iteration] : []);

    let totalCost = 0;
    let totalHours = 0;
    let upgradeCount = 0;
    let costClass = '';
    let imageSrc = '';

    iterations.forEach((currentIteration) => {
        const currentUpgradeCosts = currentIteration.querySelectorAll('.resource-cost-1 strong, .resource-cost-2 strong, .resource-cost-3 strong');
        const currentUpgradeTimes = currentIteration.querySelectorAll('.future-upgrade-time');
        const image = currentIteration.querySelector('.future-upgrades img');

        if (image) {
            imageSrc = image.getAttribute('src');
        }

        currentUpgradeCosts.forEach((cost) => {
            const costValue = cost.textContent.trim();
            const multiplier = costValue.includes('M') ? 1000000 : costValue.includes('K') ? 1000 : 1;
            const costNumber = parseFloat(costValue.replace(/[^\d.]/g, '')) * multiplier;
            totalCost += costNumber;
            upgradeCount++;
            costClass = cost.parentNode.className;
        });

        currentUpgradeTimes.forEach((time) => {
            const timeText = time.textContent.trim();
            const daysMatch = timeText.match(/(\d+)d/);
            const hoursMatch = timeText.match(/(\d+)h/);
            const days = daysMatch ? parseInt(daysMatch[1]) : 0;
            const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
            totalHours += days * 24 + hours;
        });
    });

    const formattedTotalCost = formatNumber(totalCost);
    const formattedTotalTime = formatTime(totalHours);

    return { formattedTotalCost, formattedTotalTime, upgradeCount, costClass, imageSrc };
}
