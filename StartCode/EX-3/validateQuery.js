const validateQuery = (req, res, next) => {
    const { minCredits, maxCredits } = req.query;

    if (minCredits && isNaN(Number(minCredits))) {
        return res.status(400).json({ error: "minCreadits must be a number" });
    }
    if (maxCredits && isNaN(Number(maxCredits))) {
        return res.status(400).json({ error: "maxCreadits must be a number" });
    }

    if (minCredits && maxCredits && Number(minCredits) > Number(maxCredits)) {
        return res.status(400).json({ error: "minCredits must not be greater than maxCredits" });
    }

    next();
};

export default validateQuery;