function resolveAfter5Seconds() {
    return new Prommise(resolve => {
        console.log('starting slow process')

        setTimeout(function () {
            resolve('slow');
            console.log('slow promise is done')
        }, 5000)
    })
}

function resolveAfter1Second() {
}

function normalBehavior() {
    console.log("--NORMAL BEHAVIOR START");

    resolveAfter5Seconds();

    console.log('After Slow');

    resolveAfter1Second();

    console.log("after fast")
}

async function sequentialBehavior() {
    console.log("--SEQUENTIAL BEHVAIOR START---");

    await resolveAfter5Seconds();
}



