# BBN Polls Contracts

### Proposed Steps.

- Deploy `BBNEventRegistry`.
- Deploy `BBNPool`.
- Deploy `BBNEventResolution`.

- Set `BBNPool` address and `BBNEventResolution` address in `BBNEventRegistry`.


- `BBNEventRegistry` allows curators to deploy a new `BBNEvent` and its child `BBNEventERC721`, setting the `BBNPool` address and `BBNEventResolution` address in the contract.
- `BBNPool` interacts with every `BBNEvent`.

- `BBNEventResolution` resolves events set at `BBNEvent`.

---