import { GetItemMethodContract } from "../contracts/GetItemMethodContract";
import { SetItemMethodContract } from "../contracts/SetItemMethodContract";
import { RemoveItemMethodContract } from "../contracts/RemoveItemMethodContract";

export interface StorageContainerInterface extends GetItemMethodContract, SetItemMethodContract, RemoveItemMethodContract { }
