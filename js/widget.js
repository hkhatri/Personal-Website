/**
 * Created by Hilay Khatri on 8/11/2014.
 *
 * The following widget will create an expandable layout depending on the object passed
 *
 * The object should have following structure:
 *
 * var data = [{
 *      company: string
 *      title: string
 *      start: Date (MM-YY)
 *      end: Date (MM-YY/Empty)
 *      details: String
 *      icon: Image URI
 *      }]
 */

function infoWidget(data, parent) {
    this.store = data;
    this.parent = parent;
    this._html = document.createElement("div");

    this.build = function() {
        var wrapper = document.createElement("div");
        for (var i = 0; i < this.store.length; i++) {
             var item = document.createElement("div");
             item.className = "widget_main_data_class";

             var item_p1 = document.createElement("p");
             item_p1.className = "widget_main_data_content_header";
             item_p1.innerHTML = this.store[i].company;

             var item_p2 = document.createElement("p");
             var item_p2_table =  document.createElement("table");
             item_p2_table.className = "widget_main_content_bg_table_class";
             // Row 1
             var row1 = item_p2_table.insertRow(item_p2_table.rows.length);
             // Cell 1
             var data11 = row1.insertCell(0);
             data11.style.width = "50%";
             data11.align = "center";
             var img = document.createElement("img");
             img.src = this.store[i].icon;
             img.className = "widget_main_content_bg_td_class";
             data11.appendChild(img);
             // Cell 2
             var data12 = row1.insertCell(1);
             data12.style.width = "50%";
             data12.align = "center";
             var detail = document.createElement("p");
             // Add Job title to Details
             var jobTitle = document.createElement("h3");
             jobTitle.innerHTML = this.store[i].title;
             detail.appendChild(jobTitle);
             var date = document.createElement("div");
             date.innerHTML = this.store[i].start + " to " + this.store[i].end;
             detail.appendChild(date);
             data12.appendChild(detail);

             var desc = document.createElement("div");
             desc.className = "widget_main_content_description_details";
             desc.innerHTML = this.store[i].details;

             item.appendChild(item_p1);
             item.appendChild(item_p2);
             item.appendChild(desc);
             item_p2.appendChild(item_p2_table);

             wrapper.appendChild(item);
             var linebreak = document.createElement("br");
             wrapper.appendChild(linebreak);
             this._html.appendChild(wrapper);
        }
    var empty = document.createElement("div");
    empty.style.height = "130px";

    this.parent.innerHTML = "";
    this.parent.appendChild(empty);
    this.parent.appendChild(this._html);
    }
}