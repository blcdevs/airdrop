// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.7.0;

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}


interface IERC20Metadata is IERC20 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}


contract ERC20 is Context, IERC20, IERC20Metadata {
    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

  
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }

   
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

  
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    }

   
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        address owner = _msgSender();
        uint256 currentAllowance = allowance(owner, spender);
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        unchecked {
            _approve(owner, spender, currentAllowance - subtractedValue);
        }

        return true;
    }

   
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(from, to, amount);

        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[from] = fromBalance - amount;
        }
        _balances[to] += amount;

        emit Transfer(from, to, amount);

        _afterTokenTransfer(from, to, amount);
    }

  
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }

   
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - amount;
        }
        _totalSupply -= amount;

        emit Transfer(account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }


    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

   
    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

   
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}


    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}
}


library SafeMath {
   
    function tryAdd(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }

   
    function trySub(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

   
    function tryMul(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
         
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

   
    function tryDiv(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

    function tryMod(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

   
    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

   
    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

   
    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}


abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        _transferOwnership(_msgSender());
    }

   
    function owner() public view virtual returns (address) {
        return _owner;
    }

  
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

   
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

   
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

   
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}


abstract contract Token is ERC20 {}


contract Airdrop is Ownable {
    using SafeMath for uint;

    // Token and Airdrop variables
    address public _tokenContract;
    uint256 public _airdropAmount;
    uint256 public _fee = 0.005 ether;
    uint256 public totalAirdrops;

    // Referral variables
    uint256 public _referralReward = 1 ether; // 1 token with 18 decimals
    mapping(address => address[]) public userReferrals;
    mapping(address => uint256) public referralRewards;
    mapping(address => bool) public hasClaimedReferralReward;

    struct AirdropInfo {
        uint256 id;
        address useraddress;
        // string name;
        string twitterId;
        string email;
        uint256 timestamp;
    }

    mapping(uint256 => AirdropInfo) public airdropInfos;

    // Events
    event EtherTransfer(address beneficiary, uint amount);
    event ReferralRegistered(address indexed referrer, address indexed referred);
    event ReferralRewardClaimed(address indexed referrer, uint256 amount);

    constructor(address tokenContract, uint256 airdropAmount) {
        _tokenContract = tokenContract;
        _airdropAmount = airdropAmount;
    }

    // Airdrop Functions
    function dropTokens(string memory _twitterId, string memory _email) public payable returns (bool) {
        require(msg.value >= _fee, "Not enough cash");
        require(Token(_tokenContract).balanceOf(msg.sender) < _airdropAmount, "Already claimed");
        require(Token(_tokenContract).transfer(msg.sender, _airdropAmount), "Transfer failed");
        
        uint256 airdropId = totalAirdrops++;
        airdropInfos[airdropId] = AirdropInfo(
            airdropId, 
            msg.sender, 
            // _name,
            _twitterId,
            _email, 
            block.timestamp
        );
        
        return true;
    }

    // Referral Functions
// Update the registerReferral function
function registerReferral(address referrer) external {
    require(referrer != msg.sender, "Cannot refer yourself");
    require(referrer != address(0), "Invalid referrer address");
    
    // Add debug event
    emit Debug("Registering referral", msg.sender, referrer);
    
    // Check if the user is already in the referrer's list
    address[] memory referrals = userReferrals[referrer];
    for (uint i = 0; i < referrals.length; i++) {
        require(referrals[i] != msg.sender, "Already referred by this referrer");
    }
    
    // Add the referred user to the referrer's list
    userReferrals[referrer].push(msg.sender);
    
    // Add referral reward to referrer's balance
    referralRewards[referrer] = referralRewards[referrer].add(_referralReward);
    
    // Add debug event
    emit Debug("Referral registered successfully", msg.sender, referrer);
    emit ReferralRegistered(referrer, msg.sender);
}

// Add debug event
event Debug(string message, address user, address referrer);

    function claimReferralRewards() external {
        uint256 rewards = referralRewards[msg.sender];
        require(rewards > 0, "No rewards to claim");
        require(!hasClaimedReferralReward[msg.sender], "Already claimed rewards");
        
        hasClaimedReferralReward[msg.sender] = true;
        referralRewards[msg.sender] = 0;
        
        require(Token(_tokenContract).transfer(msg.sender, rewards), "Transfer failed");
        
        emit ReferralRewardClaimed(msg.sender, rewards);
    }

    function getReferralStats(address user) external view returns (
        uint256 totalReferrals,
        uint256 pendingRewards,
        bool hasClaimed
    ) {
        return (
            userReferrals[user].length,
            referralRewards[user],
            hasClaimedReferralReward[user]
        );
    }

    // Admin Functions
    function setTokenContract(address tokenContract) external onlyOwner {
        _tokenContract = tokenContract;
    }

    function setAirdropAmount(uint256 airdropAmount) external onlyOwner {
        _airdropAmount = airdropAmount;
    }

    function setFee(uint256 fee) external onlyOwner {
        _fee = fee;
    }

    function setReferralReward(uint256 amount) external onlyOwner {
        _referralReward = amount;
    }

    // Utility Functions
    function tokenBalance(address _tokenAddr) public view returns (uint256) {
        return Token(_tokenAddr).balanceOf(address(this));
    }

    function withdrawTokens(address beneficiary, address _tokenAddr) public onlyOwner {
        require(Token(_tokenAddr).transfer(beneficiary, Token(_tokenAddr).balanceOf(address(this))));
    }

    function withdrawEther(address payable beneficiary) public onlyOwner {
        beneficiary.transfer(address(this).balance);
    }

    function contractBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function getAllAirdrops() external view returns (AirdropInfo[] memory) {
        AirdropInfo[] memory _airdrops = new AirdropInfo[](totalAirdrops);
        for (uint256 i = 0; i < totalAirdrops; i++) {
            _airdrops[i] = airdropInfos[i];
        }
        return _airdrops;
    }

// Fix the isAlreadyReferred function
function isAlreadyReferred(address user) public view returns (bool) {
    // Check all possible referrers
    for (uint i = 0; i < totalAirdrops; i++) {
        address[] memory referrals = userReferrals[airdropInfos[i].useraddress];
        for (uint j = 0; j < referrals.length; j++) {
            if (referrals[j] == user) {
                return true;
            }
        }
    }
    return false;
}

}