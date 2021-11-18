App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    hasVoted: false,

    init: function() {
        return App.initWeb3();
    },

    initWeb3: function() {
        // TODO: refactor conditional
        if (typeof web3 !== 'undefined') {
            // If a web3 instance is already provided by Meta Mask.
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            // Specify default instance if no web3 instance provided
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(App.web3Provider);
        }
        return App.initContract();
    },

    initContract: function() {
        $.getJSON("Election.json", function(election) {
            // Instantiate a new truffle contract from the artifact
            App.contracts.Election = TruffleContract(election);
            // Connect provider to interact with contract
            App.contracts.Election.setProvider(App.web3Provider);

            App.listenForEvents();

            return App.render();
        });
    },

    // Listen for events emitted from the contract
    listenForEvents: function() {
        App.contracts.Election.deployed().then(function(instance) {
            // Restart Chrome if you are unable to receive this event
            // This is a known issue with Metamask
            // https://github.com/MetaMask/metamask-extension/issues/2393
            instance.votedEvent({}, {
                fromBlock: 0,
                toBlock: 'latest'
            }).watch(function(error, event) {
                console.log("event triggered", event)
                    // Reload when a new vote is recorded
                App.render();
            });
        });
    },

    render: function() {
        var electionInstance;
        var loader = $("#loader");
        var content = $("#content");

        loader.show();
        content.hide();

        // Load account data
        web3.eth.getCoinbase(function(err, account) {
            if (err === null) {
                App.account = account;
                $("#accountAddress").html("Your Account: " + account);
            }
        });

        // Load contract data
        App.contracts.Election.deployed().then(function(instance) {
            electionInstance = instance;
            return electionInstance.candidatesCount();
        }).then(function(candidatesCount) {
            var candidatesResults = $("#candidatesResults");
            candidatesResults.empty();

            var candidatesSelect = $('#candidatesSelect');
            candidatesSelect.empty();

            for (var i = 1; i <= candidatesCount; i++) {
                electionInstance.candidates(i).then(function(candidate) {
                    var id = candidate[0];
                    var name = candidate[1];
                    var voteCount = candidate[2];

                    // Render candidate Result
                    // var candidateTemplate = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + "</td><td>" + name + "</td><td>" + voteCount + "</td></tr>"
                    if (id == 1) {
                        var candidateTemplate = '<div class="col-md-6 col-lg-4"> <div class="card mx-30"> <img src="https://cdn1-production-images-kly.akamaized.net/P85Ddv6JF2FbVJeoCgCelmhtt4U=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1439641/original/042027300_1482131661-reddit.jpg" class="card-img-top" alt="..."> <div class="card-body"> <h5 class="card-title" style="text-align:center;">' + name + '</h5> <h6 style="text-align:center;"> Vote: ' + voteCount + '</h6> <p class="card-text"> Perwakilan dari desa Konoha <div class="socials"> </div> </div> </div> </div>'
                        candidatesResults.append(candidateTemplate);
                    } else {
                        var candidateTemplate = '<div class="col-md-6 col-lg-4"> <div class="card mx-30"> <img src="https://cdn.idntimes.com/content-images/duniaku/post/20191008/naruto-sasuke-uchiha-kecil-be340da3b7c782e66836584d5940ea73.jpg" class="card-img-top" alt="..."> <div class="card-body"> <h5 class="card-title" style="text-align:center;">' + name + '</h5> <h6 style="text-align:center;"> Vote: ' + voteCount + '</h6> <p class="card-text">  Perwakilan dari kota Binjai <div class="socials"> </div> </div> </div> </div>'
                        candidatesResults.append(candidateTemplate);
                    }

                    // Render candidate ballot option
                    var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
                    candidatesSelect.append(candidateOption);
                });
            }
            return electionInstance.voters(App.account);
        }).then(function(hasVoted) {
            // Do not allow a user to vote
            if (hasVoted) {
                $('form').hide();
            }
            loader.hide();
            content.show();
        }).catch(function(error) {
            console.warn(error);
        });
    },

    castVote: function() {
        var candidateId = $('#candidatesSelect').val();
        App.contracts.Election.deployed().then(function(instance) {
            return instance.vote(candidateId, { from: App.account });
        }).then(function(result) {
            // Wait for votes to update
            $("#content").hide();
            $("#loader").show();
        }).catch(function(err) {
            console.error(err);
        });
    }
};

$(function() {
    $(window).load(function() {
        App.init();
    });
});