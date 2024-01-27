import ListItem from './ListItem'

interface List{
    list:ListItem[],
    load():void,
    save():void,
    clearList():void,
    addItem(itemObj:ListItem):void,
    removeItem(id:string):void
}

export default class FullList implements List{
    static instance=new FullList([])
    private constructor(private _list:ListItem[]){}

    get list():ListItem[]{
        return this._list
    }
    load():void{
        const storedList:{_id:string,_item:string,_checked:boolean}[] | null=JSON.parse(localStorage.getItem('myList')??"[]")
        if(!storedList)return 
        storedList.forEach(element => {
            const itm=new ListItem(element._id,element._item,element._checked)
            FullList.instance.addItem(itm)
        });

    }

    save():void{
        localStorage.setItem("myList",JSON.stringify(this.list))
    }
    clearList():void{
        this._list=[]
        this.save()
    }
    addItem(itemObj: ListItem): void {
        this._list=[...this._list,itemObj]
        this.save()
    }
    removeItem(id: string): void { 
        this._list=this._list.filter((itm)=>itm.id!==id)
        this.save()
    }

}