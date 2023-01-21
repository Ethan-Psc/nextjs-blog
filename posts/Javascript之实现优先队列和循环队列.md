优先队列的实现

    function PriorityQueue() {
        var items = [];
        
        // {1}
        function QueueElement(element, priority) {
            this.element = element;
            this.priority = priority;
        }
        
        this.enqueue = function(element, priority) {
            var queueElement = new QueueElement(element, priority);
            
            if(this.isEmpty()) {
                items.push(queueElement);  // {2}
            } else {
                var added = false;
                for(var i = 0; i < items.length; i++) {
                    if(queueElement.priority < items.[i].priority) {
                        items.splice(i, 0, queueElement);    // {3}
                        added = true;
                        break;
                    }
                }
                if(!added) {    // {4}
                    items.push(queueElement);
                }
            }
        }
        
        // 其他方法与默认队列一样
    }





循环队列的实现

循环队列相当于击鼓传花的游戏，花落到谁的手就淘汰谁。

```arcade
function hotPotato(namelist, num) {
    var queue = new Queue();
    for (var i = 0; i < namelist.length; i++) {     // {1}
        queue.enqueue(namelist[i]);
    }
    var eliminated = "";
    while (queue.size() > 1) {                 // {2}
        for (var i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue());    // {3}
        }
        eliminated = queue.dequeue();    // {4}
        console.log(eliminated + "在击鼓传花游戏中被淘汰");
    }
    return queue.dequeue();    // {5}
}
var names = ['john', 'jack', 'camila', 'ingrid', 'carl'];
var winner = hotPotato(names, 7);
console.log("胜利者： " + winner);      //john
```