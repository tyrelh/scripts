
class Node {
    constructor(name) {
        this.name = name;
        this.connections = [];
    }
    connectTo(node) {
        this.connections.push(node);
    }
}


// code provided by Brody G and translated to JavaScript by Tyrel H
////// SOLUTION
function pathExists(start, end) {
    let result = false;

    if (start == end) {
        return true;
    }

    for (let i = 0; i < start.connections.length; i++) {
        if (start.connections[i] == end) {
            return true;
        }
        if (start.connections[i].connections.length > 0) {
            result = pathExists(start.connections[i], end);
        }
        if (result == true) {
            return true;
        }
    }

    return false;
}
////// END SOLUTION

// recursive solution
function tyrelsRecursivePathExists(start, end) {
    if (start == end) {
        return true;
    }
    for (connection of start.connections) {
        if (pathExists(connection, end)) {
            return true;
        }
    }
    return false;
}

// recursive solution that handles cycles
function tyrelsRecursiveCyclesPathExists(start, end) {
    function checkNode(start, end, visited = []) {
        console.log(visited);
        if (start == end) {
            return true;
        }
        if (visited[start.name]) {
            return false;
        }
        visited[start.name] = true;
        for (connection of start.connections) {
            if (checkNode(connection, end, visited)) {
                return true;
            }
        }
        return false;
    }
    return checkNode(start, end)
}

// stack solution
function tyrelsStackPathExists(start, end) {
    const stack = [];
    stack.push(start);
    while(stack.length > 0) {
        const current = stack.pop();
        if (current == end) {
            return true;
        }
        stack.push(...current.connections);
    }
    return false;
}

// stack solution that handles cycles
function tyrelsStackCyclesPathExists(start, end) {
    const stack = [];
    const visited = [];
    stack.push(start);
    while(stack.length > 0) {
        const current = stack.pop();
        if (current == end) {
            return true;
        }
        if (visited[current.name]) {
            continue;
        }
        visited[current.name] = true;
        stack.push(...current.connections);
    }
    return false;
}


// output usage instructions of script
function usage() {
    console.log("Usage:");
    console.log("   node brody-graph.js <start node> <end node>");
    console.log("Node arg must be A, B, C, D, E, F, G, or H");
    process.exit(1);
}


function main() {
    // get cli args
    if (process.argv.length != 4) {
        usage();
    }
    const start = process.argv[2];
    const end = process.argv[3];

    // create nodes
    const nodes = {
        "A": new Node("A"),
        "B": new Node("B"),
        "C": new Node("C"),
        "D": new Node("D"),
        "E": new Node("E"),
        "F": new Node("F"),
        "G": new Node("G"),
        "H": new Node("H")
    }

    // setup graph connections
    nodes["A"].connectTo(nodes["C"]);
    nodes["A"].connectTo(nodes["B"]);
    nodes["B"].connectTo(nodes["D"]);
    // nodes["D"].connectTo(nodes["E"]);
    nodes["D"].connectTo(nodes["H"]);
    nodes["F"].connectTo(nodes["E"]);
    nodes["G"].connectTo(nodes["E"]);
    // add a cycle to the graph
    nodes["D"].connectTo(nodes["A"]);

    // get start and end nodes
    const startNode = nodes[start];
    const endNode = nodes[end];
    if (!startNode || !endNode) {
        usage();
    }

    // calculate if there is a path
    let result = tyrelsStackCyclesPathExists(startNode, endNode);
    console.log(`${startNode.name} -> ${endNode.name} ? `, result);
}

main();