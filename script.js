function showSection(sectionId) {
    document.querySelectorAll('.page-section').forEach(el => {
        el.classList.add('hidden');
    });
    
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove('hidden');
    }
}

async function generatePlan() {
    const budgetValue = document.getElementById('budget').value;
    
    try {
        const response = await fetch('/api/generate-recommendations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ budget: budgetValue }),
        });
        
        const data = await response.json();
        renderResults(data);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
    }
}

function renderResults(data) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.classList.remove('hidden');

    const summaryCard = document.getElementById('budget-summary-card');
    summaryCard.innerHTML = `
        <div class="budget-summary">
            <h4>Budget Summary</h4>
            <p>Total Budget: $${data.total_budget.toFixed(2)} | Remaining Budget: $${data.remaining_budget.toFixed(2)}</p>
        </div>
    `;

    const categoryDetails = document.getElementById('category-details');
    categoryDetails.innerHTML = '';

    data.categories.forEach(cat => {
        let itemsHTML = '';
        cat.items.forEach(item => {
            let linksHTML = item.links.map(store => `<span class="store-btn"><i class="fa-solid fa-cart-shopping"></i> ${store}</span>`).join('');
            
            itemsHTML += `
                <tr>
                    <td><strong>${item.name}</strong></td>
                    <td>${item.description}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>${linksHTML}</td>
                </tr>
            `;
        });

        categoryDetails.innerHTML += `
            <div class="category-block">
                <h5>${cat.title}</h5>
                <small>Allocation: $${cat.allocation.toFixed(2)}</small>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Shopping Links</th>
                        </tr>
                    </thead>
                    <tbody>${itemsHTML}</tbody>
                </table>
            </div>
        `;
    });
    
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}
