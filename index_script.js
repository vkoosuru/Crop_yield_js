
async function run(){
    var elements=document.getElementsByClassName("input1");
    var arr=[];
    for(let i of elements)
    {
        arr.push(i.value);
    }
    const arrd=['District_Adilabad', 'District_Bhadradri','District_Jagitial', 'District_Jangoan', 'District_Jayashankar','District_Jogulamba', 'District_Kamareddy', 'District_Karimnagar','District_Khammam', 'District_Komaram bheem asifabad','District_Mahabubabad', 'District_Mahbubnagar', 'District_Mancherial','District_Medak', 'District_Medchal', 'District_Mulugu','District_Nagarkurnool', 'District_Nalgonda', 'District_Narayanapet','District_Nirmal', 'District_Nizamabad', 'District_Peddapalli','District_Rajanna', 'District_Rangareddy', 'District_Sangareddy','District_Siddipet', 'District_Suryapet', 'District_Vikarabad','District_Wanaparthy', 'District_Warangal', 'District_Warangal urban','District_Yadadri'];
    var arr1=[];
    for(let i=0;i<arrd.length;i++)
    {
        if(arr[0]==arrd[i])
        {
            arr1[i]=1;
        }
        else
        {
            arr1[i]=0;
        }
    }
    var arr2=[];
    if(arr[1]=="Season_Kharif")
    {
        arr2[0]=1;
        arr2[1]=0;
    }
    else
    {
        arr2[0]=0;
        arr2[1]=1;
    }
    const arrc=['Crop_Groundnut','Crop_Maize', 'Crop_Moong(Green Gram)', 'Crop_Rice','Crop_cotton(lint)'];
    var arr3=[];
    for(let i=0;i<arrc.length;i++)
    {
        if(arr[2]==arrc[i])
        {
            arr3[i]=1;
        }
        else
        {
            arr3[i]=0;
        }
    }
    var arrf=arr.slice(3,15).concat(arr1,arr2,arr3);
    arrf=arrf.map(parseFloat);
    const MODEL_URL = 'http://localhost:3000/model.json';
    const model = await tf.loadLayersModel(MODEL_URL);
    //console.log(model.summary());
    const input = tf.tensor3d(arrf, [1,1,51]);
    const result = await model.predict(input);
    var num=parseFloat(result.toString().slice(14,23))*68.79655917165852;
    document.getElementById("output").innerHTML=Math.round((num + Number.EPSILON) * 100) / 100+" (Kg/Acre)";
    console.log(Math.round((num + Number.EPSILON) * 100) / 100);
}