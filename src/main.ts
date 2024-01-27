import FullList from "./model/FullList"
import ListItem from "./model/ListItem"
import ListTemplate from "./template/ListTemplate"

const initApp=()=>{
  const clear=document.getElementById('clearItemsButton') as HTMLButtonElement
  const input=document.getElementsByClassName("newItemEntry__input")[0] as HTMLInputElement
  const btn=document.getElementById("addItem") as HTMLButtonElement
  btn.addEventListener('click',(e)=>{
    e.preventDefault()
    const item=new ListItem((FullList.instance.list.length+1).toString(),input.value,false)
    FullList.instance.addItem(item)
    ListTemplate.instance.render()
    input.value=""
    return
  })

  clear.addEventListener('click',()=>{
    FullList.instance.clearList()
    ListTemplate.instance.render()
  })
  FullList.instance.load()
  ListTemplate.instance.render()

}

document.addEventListener('DOMContentLoaded',initApp)