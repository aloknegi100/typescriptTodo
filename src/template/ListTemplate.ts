import FullList from "../model/FullList" 
interface DOMList{
    ul:HTMLUListElement,
    clear():void,
    render():void
}

export default class ListTemplate implements DOMList{
    ul:HTMLUListElement
    static instance: ListTemplate =new ListTemplate()
    private constructor(){
        const listContainer=document.getElementById('listItems') as HTMLUListElement
        this.ul=listContainer
    }

    clear(): void {
        this.ul.innerHTML=''
    }
    render(): void {
        this.clear()
        FullList.instance.list.forEach(element => {
            const li=document.createElement('li') as HTMLLIElement
            li.className="item"

            const checkbox=document.createElement('input') as HTMLInputElement
            checkbox.type="checkbox"
            checkbox.checked=element.checked
            checkbox.id=element.id

            checkbox.addEventListener('click',()=>{
                element.checked=!element.checked
                FullList.instance.save()
            })
            li.append(checkbox)

            const label=document.createElement('label') as HTMLLabelElement
            label.htmlFor=element.id
            label.textContent=element.item
            li.append(label)

            const btn=document.createElement('button') as HTMLButtonElement
            btn.type="button"
            btn.textContent="X"
            btn.className="button"
            btn.addEventListener('click',()=>{
                FullList.instance.removeItem(element.id)
                this.render()
            })
            li.append(btn)
            this.ul.append(li)
            
            
        });

    }

}