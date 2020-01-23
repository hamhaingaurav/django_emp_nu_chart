from django.shortcuts import render
from .models import TableData

# Create your views here.
def index(request):
    template_name = 'nu_chart/index.html'
    return render(request,template_name)


def csvGenerate(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="data.csv"'
    writer = csv.writer(response)
    writer.writerow(['districts','prerna','sadhana','class appropriate'])


    table_data = TableData.objects.all().order_by('user_id')

    for data in table_data:
        writer.writerow([data.districts,data.prerna,data.sadhana,data.class_appropriate])

    return response