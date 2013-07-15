
// The model for a Unit.  Stats should include the relevant stats,
// Options should include various kit-out possibilities, along with
// the relevant rules.
function Unit( name, stats, options, minSize, maxSize, currentSize, cost ) {
	this.name = name;
	this.stats = stats;
	this.options = options;
	this.minSize = minSize;
	this.maxSize = maxSize;
	this.currentSize = currentSize;
	this.cost = cost;
}