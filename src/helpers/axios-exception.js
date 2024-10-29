export const handleException = (error, router, paths) => {
    console.error(error);
    if (error.response?.status === 404) {
        router.push(paths.error['404']);
    } else if (error.response?.status === 401) {
        router.push(paths.error['401']);
    } else {
        router.push(paths.error['500']);
    }
};
