import * as Rx from 'rxjs';

let elementUniqueID = 0;
let categoryUniqueID = 0;
let budgetUniqueID = 0;

let instance;

class BudgetManager {

    budgetElements;
    budgetCategories;
    budgets;

    static getInstance () {

        if (!instance) {

            instance = new BudgetManager();

        }

        return instance;

    }

    constructor () {

        this.budgetUpdateStream = new Rx.Subject();

        //  initialize generic stores
        this.budgets = [];
        this.elements = [];
        this.categories = [];

        this.activeBudgetID = 0;

        //  Construct example budget
        const budgetACategories = [];
        const incomeCategoryElements = [];
        const taxCategoryElements = [];

        //  Grab salary ID to be used by taxes
        const salaryID = this.addAmountElement('Salary', 70000, BudgetManager.PERIODS.YEAR);

        incomeCategoryElements.push(salaryID);
        taxCategoryElements.push(this.addPercentElement('401k', 0.05, salaryID));
        taxCategoryElements.push(this.addPercentElement('Federal Tax', 0.1269, salaryID));
        taxCategoryElements.push(this.addPercentElement('State Tax', 0.0413, salaryID));
        taxCategoryElements.push(this.addPercentElement('Medicare', 0.0145, salaryID));
        taxCategoryElements.push(this.addPercentElement('Social Security', 0.062, salaryID));

        budgetACategories.push(this.addCategory('Income', BudgetManager.CATEGORY_TYPES.ADDITIVE, incomeCategoryElements));
        budgetACategories.push(this.addCategory('Tax', BudgetManager.CATEGORY_TYPES.SUBTRACTIVE, taxCategoryElements));

        this.addBudget('Budget A', budgetACategories);
        
        //  Construct second test budget
        const budgetBCategories = [];
        const budgetBElements = [];

        budgetBElements.push(this.addAmountElement('Value', 360, BudgetManager.PERIODS.YEAR));
        budgetBCategories.push(this.addCategory('Category', BudgetManager.CATEGORY_TYPES.ADDITIVE, budgetBElements));

        this.addBudget('Budget B', budgetBCategories);

    }
    
    getBudgetUpdateObservable = () => {

        return this.budgetUpdateStream.asObservable();

    };

    getBudgets = () => {

        return this.budgets;

    };

    getBudget = id => {

        return this.budgets.find(budget => budget.id === id);

    };

    getActiveBudget = () => {

        return this.getBudget(this.activeBudgetID);

    };

    getCategories = () => {

        return this.categories;

    };

    getCategory = id => {

        return this.categories.find(category => category.id === id);

    };

    getElements = () => {

        return this.elements;

    };

    getElement = id => {

        return this.elements.find(element => element.id === id);

    };

    setActiveBudget = id => {

        let parsedID = parseInt(id);

        if (Number.isNaN(parsedID)) {

            console.warn('Invalid budget ID given, returning default Budget');

            parsedID = 0;

        }

        this.activeBudgetID = parsedID;

    }

    addBudget = (name, categories = []) => {

        const budgetID = budgetUniqueID;

        this.budgets.push({
            'name': name,
            'id': budgetID,
            'categories': categories
        });

        budgetUniqueID++;

        return budgetID;

    };

    addCategory = (name, type, elements = []) => {

        const categoryID = categoryUniqueID;

        this.categories.push({
            'name': name,
            'type': type,
            'id': categoryID,
            'elements': elements
        });

        categoryUniqueID++;

        return categoryID;

    };

    addAmountElement = (name, amount, period) => {

        return this.addElement(name, {
            'value': amount,
            'type': BudgetManager.VALUE_TYPES.AMOUNT,
            'period': period
        });

    };

    addPercentElement = (name, percentage, target) => {

        return this.addElement(name, {
            'value': percentage,
            'type': BudgetManager.VALUE_TYPES.PERCENT,
            'target': target
        });

    };

    addElement = (name, props) => {

        const elementID = elementUniqueID;

        this.elements.push({
            'name': name,
            'id': elementID,
            'baseValue': props
        });

        elementUniqueID++;

        return elementID;

    };

    updateElement = (element, period, value) => {

        const elementID = element.id;

        const elementIndex = this.elements.findIndex(elem => elem.id === elementID);

        this.elements[elementIndex].baseValue = {
            'value': value,
            'type': BudgetManager.VALUE_TYPES.AMOUNT,
            'period': period
        };

        this.budgetUpdateStream.next();

    };

    getAmountConvertedForPeriod = (baseValue, period) => {

        const convertedValue = baseValue.value * (BudgetManager.PERIOD_INTERVALS[period] / BudgetManager.PERIOD_INTERVALS[baseValue.period]);

        return convertedValue;

    };

    getValueForPeriod = (baseValue, period, budgetID = this.activeBudgetID) => {

        let exactValue = 0;

        switch (baseValue.type) {
        case BudgetManager.VALUE_TYPES.AMOUNT:
            exactValue = this.getAmountConvertedForPeriod(baseValue, period);
            return exactValue;
        case BudgetManager.VALUE_TYPES.PERCENT:
            const targetValue = this.getElement(baseValue.target).baseValue;
            exactValue = baseValue.value * this.getAmountConvertedForPeriod(targetValue, period);
            return exactValue;
        default:
            return NaN;

        }

    };

    getDiscretionaryForPeriod = (period, budgetID = this.activeBudgetID) => {

        let total = 0;

        const budget = this.getBudget(budgetID);

        budget.categories.map(this.getCategory).forEach(category => {
            
            category.elements.map(this.getElement).forEach(element => {

                const elementValue = this.getValueForPeriod(element.baseValue, period, budgetID);

                const MODIFIER = category.type === BudgetManager.CATEGORY_TYPES.ADDITIVE ? 1 : -1;
                
                total += elementValue * MODIFIER;

            });

        });

        return total;

    };

}

BudgetManager.PERIODS = {
    'YEAR': 'YEAR',
    'MONTH': 'MONTH',
    'WEEK': 'WEEK',
    'DAY': 'DAY',
    'HOUR': 'HOUR'
};

BudgetManager.PERIOD_INTERVALS = {
    'YEAR': 8760,
    'MONTH': 730,
    'WEEK': 168,
    'DAY': 24,
    'HOUR': 1
}

BudgetManager.VALUE_TYPES = {
    'AMOUNT': 'AMOUNT',
    'PERCENT': 'PERCENT'
}

BudgetManager.CATEGORY_TYPES = {
    'ADDITIVE': 'ADDITIVE',
    'SUBTRACTIVE': 'SUBTRACTIVE'
}

export default BudgetManager;
