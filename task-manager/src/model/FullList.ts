import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  // make this class a singleton cause we will be creating only one instance from this or AKA only one list

  //   make the instance static to access that without creating any instance of the class
  static instance: FullList = new FullList();
  //   use private constructor for creating singleton
  private constructor(private _list: ListItem[] = []) {}

  public load(): void {
    const storedList: string | null = localStorage.getItem("myList");
    if (typeof storedList !== "string") {
      return;
    }
    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);

    parsedList.forEach((itemObj) => {
      // converting type from parsed js object to ListItem type by creating a new object by list item class
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
      FullList.instance.addItem(newListItem);
    });
  }

  //   saves list to the  local storage
  public save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  // set list as an empty array in local storage
  public clearList(): void {
    this._list = [];
    this.save();
  }

  //   add an item to the list and save that list to local storage
  public addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  // remove an item from the list and save that list to local storage
  public removeItem(id: string): void {
    const newList = this._list.filter((item) => item.id !== id);
    this._list = newList;
    this.save();
  }
  //   getter and setter
  get list(): ListItem[] {
    return this._list;
  }

  /* setter not really needed here
  set list(list: ListItem[]) {
    this._list = list;
  }
  */
}
