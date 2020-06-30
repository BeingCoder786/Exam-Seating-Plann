function generatePDF(){
    var doc = new jsPDF();
    doc.fromHTML($('#content').html(), 15, 15, {
        'width': 170
    });
    doc.save('seatingplan.pdf');
}
