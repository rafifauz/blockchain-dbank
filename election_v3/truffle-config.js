module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // for more about customizing your Truffle configuration!
    networks: {
        development: {
            host: "52.77.217.70",
            port: 8545,
            network_id: "*" // Match any network id
        }
    },
    compilers: {
        solc: {
            version: '0.4.25',
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
};