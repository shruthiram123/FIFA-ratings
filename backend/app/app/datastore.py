import json
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class DataStore(object):
    def __init__(self , location, headings_location):
        self.location = os.path.expanduser(location)
        self.headings_location = os.path.expanduser(headings_location)
        self.load(self.location, self.headings_location)

    def load(self , location, headings_location):
       if os.path.exists(location) and os.path.exists(headings_location):
           self._load()
       else:
            self.db = {}
            self.headings = []
            with open(BASE_DIR+'/app/data.csv') as f:
                lis = [line.split(',') for line in f]
                headings = []        
                for i, x in enumerate(lis):             
                    if i == 0 :
                        self.set_headings(x)
                    else:
                        self.set(','.join(x), x[1])
       return True

    def _load(self):
        self.db = {}
        with open(self.location, "r") as f:
            lis = [line.split(',') for line in f]
            for i,x in enumerate(lis):
                self.db[x[1]] = ','.join(x)

        self.headings = []
        with open(self.headings_location, "r") as f:
            h = [line.split(',') for line in f]
            for heading in h[0]:
                if heading != "\n":
                    self.headings.append(heading)


    def adddb(self, obj, i):
        try:
            with open(self.location, 'a') as f:
                f.write(obj)
                f.close()
            return True
        except Exception as e:
            return False

    def set_headings(self, headings_list):
        with open(self.headings_location, 'w', newline='') as f:
            f.write(','.join(headings_list))
            f.close()

    def set(self , obj, id):
        try:
            self.db[str(id)] = obj
            self.adddb(obj, str(id))
        except Exception as e:
            print("[X] Error Saving Values to Datastore : " + str(e))
            return False

    def get(self , id):
        try:
            attrs = self.db[str(id)].split(",")
            temp = {}
            for idx, ele in enumerate(attrs):
                if idx < len(self.headings):
                    if '"' in ele:
                        ele += "," + attrs[idx+1]
                        del attrs[idx+1]
                    temp[self.headings[idx]] = ele
            return temp
        except KeyError:
            print("No Value Can Be Found for " + str(id))
            return False

    def get_range(self, start, end):
        try:
            result = []
            for i, x in enumerate(self.db):
                if start - 1 <= i < end:
                    temp = {}
                    attrs = self.db[x].strip("\n").split(",")
                    for idx, ele in enumerate(attrs):
                        if idx < len(self.headings):
                            if '"' in ele:
                                ele += "," + attrs[idx+1]
                                del attrs[idx+1]
                            temp[self.headings[idx]] = ele
                    result.append(temp)

            return result
        except Exception as e:
            print(e)
            return False

    def delete_csv(self, p_id):
        try:
            with open(self.location, "r") as f:
                lines = f.readlines()
            with open(self.location, "w") as f:
                for line in lines:
                    if line.strip("\n").split(',')[1] != p_id:
                        f.write(line)
            return True
        except Exception as e:
            print(e)
    
    def edit_csv(self, p_id, data):
        try:
            with open(self.location, "r") as f:
                lines = f.readlines()
            with open(self.location, "w") as f:
                for line in lines:
                    if line.strip("\n").split(',')[1] != p_id:
                        f.write(line)
                    else:
                        f.write(data)
            return True
        except Exception as e:
            print(e)

    def delete(self , p_id):
        try:
            if not p_id in self.db:
                return False
            del self.db[str(p_id)]
            print(p_id)
            return self.delete_csv(p_id)
        except Exception as e:
            print('delete')
            print(e)
        
    def edit(self , p_id, data):
        try:
            if not p_id in self.db:
                return False
            self.db[str(p_id)] = data
            return self.delete_csv(p_id)
        except Exception as e:
            print('delete')
            print(e)

    def resetdb(self):
        self.db={}
        return True
